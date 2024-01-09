import { FC, memo, useEffect, useRef } from "react"
import init, {
  FlatBufferContainer,
  deserialize_array_buffer,
} from "rust_wasm_deserialize"
import { concatenateUint8Arrays } from "./concatenateUint8Arrays"
import { decodeUint8Arrays } from "./saveAsFile"
import { deserialize } from "./serialize"

function rustWasmDeserialize(filename: string, buffer: Uint8Array): number {
  try {
    const start = performance.now()
    const res = deserialize_array_buffer(buffer)
    const decodedFlatBuffers = reconstructVecVecU8(res ?? new Uint8Array())
    const timeElapsed = performance.now() - start
    console.log(
      `[${filename}][rustWasmDeserialize][time_elapsed] = ${timeElapsed.toFixed(
        2,
      )}ms`,
    )

    console.debug(
      `[${filename}][rust wasm][deserialize_array_buffer] time elapsed ${timeElapsed.toFixed(
        2,
      )}ms, decodedFlatBuffers=`,
      decodedFlatBuffers,
      `res=`,
      res,
    )
    return timeElapsed
  } catch (error) {
    console.error("Error:", error)
    return 0
  }
}

async function processProtobufs(
  filename: string,
  protobufBuffers: Uint8Array[],
): Promise<number> {
  const start = performance.now()
  const container = new FlatBufferContainer()
  await container.process_protobufs(protobufBuffers)
  const start_get = performance.now()
  let result: Uint8Array[] = []
  const bufferCount = container.get_flatbuffer_count()
  for (let i = 0; i < bufferCount; i++) {
    const flatBuffer = container.get_flatbuffer(i)
    result.push(flatBuffer)
  }
  console.log(
    `[${filename}][process_protobufs][read] = ${(
      performance.now() - start_get
    ).toFixed(2)}ms`,
  )

  const timeElapsed = performance.now() - start
  console.log(
    `[${filename}][process_protobufs][time_elapsed] = ${timeElapsed.toFixed(
      2,
    )}ms`,
  )

  console.debug(
    `[${filename}][rust wasm][process_protobufs] time elapsed ${timeElapsed.toFixed(
      2,
    )}ms result=`,
    result,
  )
  return timeElapsed
}

const fetchBinary = async (fileName: string) => {
  const res = await fetch(`./${fileName}`)
  return res.arrayBuffer()
}

const js_native_deserialize_buffers = (
  filename: string,
  buffers: Uint8Array[],
) => {
  const start = performance.now()
  const decodedJsons = buffers.map((data) => deserialize(data))
  const timeElapsed = performance.now() - start

  console.log(
    `[${filename}][js_native_deserialize_buffers][time_elapsed] = ${timeElapsed.toFixed(
      2,
    )}ms`,
  )

  console.debug(
    `[${filename}][js][js_native_deserialize_buffers] time elapsed ${timeElapsed.toFixed(
      2,
    )}ms, decodedJsons=`,
    decodedJsons,
  )

  return timeElapsed
}

type BenchmarkProps = {}

const benchmarkTest = async (
  data: ArrayBuffer,
  filename: string,
): Promise<void> => {
  const decoded = decodeUint8Arrays(data)
  const concatenated = concatenateUint8Arrays(decoded)

  // * case 2 rust with Unit8Array encode and decode
  const timeElapsed2 = rustWasmDeserialize(filename, concatenated)

  // * native js
  const timeElapsed = js_native_deserialize_buffers(filename, decoded)

  // * case 3 rust with protobufs direct process
  const timeElapsed3 = await processProtobufs(filename, decoded)

  console.debug(
    `[${filename}][rustWasmDeserialize v.s JS] ${timeElapsed2.toFixed(
      2,
    )}/${timeElapsed.toFixed(2)} = ${Number(timeElapsed2 / timeElapsed).toFixed(
      2,
    )}x (lower the better)`,
  )

  console.debug(
    `[${filename}][processProtobufs v.s JS] ${timeElapsed3.toFixed(
      2,
    )}/${timeElapsed.toFixed(2)} = ${Number(timeElapsed3 / timeElapsed).toFixed(
      2,
    )}x (lower the better)`,
  )

  console.debug(
    `[${filename}][processProtobufs v.s rustWasmDeserialize] ${timeElapsed3.toFixed(
      2,
    )}/${timeElapsed2.toFixed(2)} = ${Number(
      timeElapsed3 / timeElapsed2,
    ).toFixed(2)}x (lower the better)`,
  )

  return
}

function reconstructVecVecU8(flattenedData: Uint8Array) {
  const results = []
  let offset = 0

  while (offset < flattenedData.length) {
    const len = new DataView(flattenedData.buffer).getUint32(offset, true)
    offset += 4
    const vector = new Uint8Array(
      flattenedData.buffer.slice(offset, offset + len),
    )
    results.push(vector)
    offset += len
  }

  return results
}

async function runTest() {
  let data = await fetchBinary("1k_binary.bin")
  await benchmarkTest(data, "1k_binary.bin")
}
async function runTest10k() {
  let data2 = await fetchBinary("10k_binary.bin")
  await benchmarkTest(data2, "10k_binary.bin")
}

const Benchmark: FC<BenchmarkProps> = () => {
  let ran = useRef(false)
  useEffect(() => {
    init().then(async (wasm) => {
      if (ran.current) return

      for (let i = 0; i < 10; i++) {
        await runTest()
        console.debug(`[runTest][1k] ${i} finished`)
      }

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
