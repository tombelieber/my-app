import { isEqual } from "lodash"
import { FC, memo, useEffect, useRef } from "react"
import init, { FlatBufferContainer } from "rust_wasm_deserialize"
import { decodeUint8Arrays } from "./saveAsFile"
import { TMyModel, deserialize } from "./serialize"
import { mapMyModelFBToJSON } from "./deserialize_fb"

async function processProtobufs(
  filename: string,
  protobufBuffers: Uint8Array[],
  container: FlatBufferContainer,
): Promise<[number, TMyModel[]]> {
  const start = performance.now()
  // * process protobufs to flatbuffers
  await container.process_protobufs(protobufBuffers)
  console.debug(
    `[${filename}][rust wasm][processProtobufs][process_protobufs][time_elapsed] = ${(
      performance.now() - start
    ).toFixed(2)}ms`,
  )
  // * convert to json
  const start_decode_json = performance.now()
  let results: TMyModel[] = []
  const bufferCount = container.get_flatbuffer_count()
  for (let i = 0; i < bufferCount; i++) {
    const flatBuffer = container.get_flatbuffer(i)
    const myModelJSON = mapMyModelFBToJSON(flatBuffer)
    results.push(myModelJSON)
  }
  console.debug(
    `[${filename}][rust wasm][processProtobufs][mapMyModelFBToJSON][time_elapsed] = ${start_decode_json.toFixed(
      2,
    )}ms`,
  )

  const timeElapsed = performance.now() - start
  console.log(
    `[${filename}][rust wasm][processProtobufs][total][results][time_elapsed] = ${timeElapsed.toFixed(
      2,
    )}ms`,
  )
  return [timeElapsed, results]
}

const fetchBinary = async (fileName: string) => {
  const res = await fetch(`./${fileName}`)
  return res.arrayBuffer()
}

const js_native_deserialize_buffers = (
  filename: string,
  buffers: Uint8Array[],
): [number, TMyModel[]] => {
  const start = performance.now()
  const decodedJsons = buffers.map((data) => deserialize(data))
  const timeElapsed = performance.now() - start
  console.log(
    `[${filename}][js][js_native_deserialize_buffers] time elapsed ${timeElapsed.toFixed(
      2,
    )}ms`,
  )
  return [timeElapsed, decodedJsons]
}

type BenchmarkProps = {}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms) // 1000 milliseconds = 1 second
  })
}

async function runTest() {
  const iter = 20
  const wait_time = 3 * 1000
  console.log(
    `runTest [iter] = ${iter}, [wait_time] = ${wait_time}ms, running in ${(
      wait_time / 1000
    ).toFixed(2)}s...`,
  )
  await delay(wait_time)

  let data = await fetchBinary("1k_binary.bin")
  const start = performance.now()
  const protoBuffers = decodeUint8Arrays(data)

  // * run 10 times Rust WASM
  const rust_results = await runRustTest(iter, "1k_binary.bin", protoBuffers)
  console.log(
    `completed, wait for ${(wait_time / 1000).toFixed(2)}s to run rust test...`,
  )

  await delay(wait_time)

  // * run 10 times JS native
  const js_results = await runJSTest(iter, "1k_binary.bin", protoBuffers)

  const js_times = js_results.map((x) => x.timeElapsed)
  const rust_times = rust_results.map((x) => x.timeElapsed)

  console.log(`[js_times]`, js_times)
  console.log(`[rust_times]`, rust_times)
  console.log(
    `[summary] [rust_times]/[js_times]`,
    rust_times.map((x, i) => x / js_times[i]),
    " (lower the better)",
  )
  console.log(
    "[runTest][finished] total time",
    (performance.now() - start).toFixed(2),
    "ms",
  )

  // * compare results by comparing jsons is Equal
  const isEquals: boolean[] = Array.from({ length: iter }).map((_, index) => {
    const js_jsons = js_results[index].jsons
    const rust_jsons = rust_results[index].jsons
    return isEqual(js_jsons, rust_jsons)
  })
  console.log(`[isEquals] isAllEqual = ${isEquals.every((x) => x)}`, isEquals)
}

type TestResult = {
  type: "js" | "rust"
  timeElapsed: number
  jsons: TMyModel[]
}

const runJSTest = async (
  count: number,
  filename: string,
  protoBuffers: Uint8Array[],
): Promise<TestResult[]> => {
  let resutls: TestResult[] = []
  for (let index = 0; index < count; index++) {
    // * native js
    const [timeElapsed, js_jsons] = js_native_deserialize_buffers(
      filename,
      protoBuffers,
    )
    resutls.push({
      type: "js",
      timeElapsed,
      jsons: js_jsons,
    })
  }
  return resutls
}

const runRustTest = async (
  count: number,
  filename: string,
  protoBuffers: Uint8Array[],
): Promise<TestResult[]> => {
  const flatBufferContainer = new FlatBufferContainer()
  let resutls: TestResult[] = []

  for (let index = 0; index < count; index++) {
    // * native js
    const [timeElapsed, fb_jsons] = await processProtobufs(
      filename,
      protoBuffers,
      flatBufferContainer,
    )
    resutls.push({
      type: "rust",
      timeElapsed,
      jsons: fb_jsons,
    })
  }
  return resutls
}

const Benchmark: FC<BenchmarkProps> = () => {
  let ran = useRef(false)
  useEffect(() => {
    init().then(async (wasm) => {
      if (ran.current) return

      await runTest()

      // await Promise.resolve(setTimeout(() => {}, 5 * 1000))

      // for (let i = 0; i < 10; i++) {
      //   await runTest10k()
      //   console.debug(`[runTest][10k] ${i} finished`)
      // }

      ran.current = true
    })
  }, [])

  return (
    <>
      <button
        onClick={() => {
          // * save serialize_data_1k_binary as file
          // saveAsFile(serialize_data_1k_binary, "1k_binary.bin")
          // saveAsFile(serialize_data_100k_binary, "100k_binary.bin")

          return false // prevent default behavior of form submission (page reload)
        }}
      >
        save binary
      </button>
    </>
  )
}

export default memo(Benchmark)
