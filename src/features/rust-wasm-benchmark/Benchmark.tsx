import { isEqual } from "lodash"
import { FC, memo, useEffect, useRef } from "react"
import init, { deserialize_array_buffer } from "rust_wasm_deserialize"
import { concatenateUint8Arrays } from "./concatenateUint8Arrays"
import { decodeUint8Arrays } from "./saveAsFile"
import { deserialize } from "./serialize"

function rustWasmDeserialize(buffer: Uint8Array) {
  try {
    return deserialize_array_buffer(buffer)
  } catch (error) {
    console.error("Error:", error)
  }
}

const fetchBinary = async (fileName: string) => {
  const res = await fetch(`./${fileName}`)
  return res.arrayBuffer()
}

const js_native_deserialize_buffers = (buffers: Uint8Array[]) =>
  buffers.map((data) => deserialize(data))

type BenchmarkProps = {}

const benchmarkTest = async (
  data: ArrayBuffer,
  filename: string,
): Promise<void> => {
  // await init()
  const decoded = decodeUint8Arrays(data)
  const concatenated = concatenateUint8Arrays(decoded)
  // * write concatenated into WebAssembly.Memory
  const start2 = performance.now()
  const res2 = rustWasmDeserialize(concatenated)
  const timeElapsed2 = performance.now() - start2
  console.debug(
    `[${filename}][rust wasm] time elapsed ${timeElapsed2.toFixed(2)}ms, res=`,
    // res2.slice(0, 10),
    res2,
  )

  const start = performance.now()
  const res = js_native_deserialize_buffers(decoded)
  const timeElapsed = performance.now() - start
  console.debug(
    `[${filename}][js] time elapsed ${timeElapsed.toFixed(2)}ms, res=`,
    res.slice(0, 10),
  )

  console.debug(`[${filename}][isEqual] res,res2 = `, isEqual(res, res2))
  console.debug(
    `[${filename}]${timeElapsed2.toFixed(2)}/${timeElapsed.toFixed(
      2,
    )} = ${Number(timeElapsed2 / timeElapsed).toFixed(2)}x (lower the better)`,
  )

  return
}

async function runTest() {
  let data2 = await fetchBinary("10k_binary.bin")
  await benchmarkTest(data2, "10k_binary.bin")

  // let data = await fetchBinary("1k_binary.bin")
  // await benchmarkTest(data, "1k_binary.bin")

  console.debug("[Finish]")
}

const Benchmark: FC<BenchmarkProps> = () => {
  let ran = useRef(false)
  useEffect(() => {
    init().then((wasm) => {
      if (ran.current) return
      runTest()
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
