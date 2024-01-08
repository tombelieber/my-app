import { isEqual } from "lodash"
import { FC, memo, useEffect, useRef } from "react"
import init, {
  InitOutput,
  deserialize_array_buffer,
} from "rust_wasm_deserialize"
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
  wasmModule: InitOutput,
): Promise<void> => {
  // await init()
  const decoded = decodeUint8Arrays(data)
  const concatenated = concatenateUint8Arrays(decoded)
  // * write concatenated into WebAssembly.Memory
  const start2 = performance.now()
  const res2_unit8Array = rustWasmDeserialize(concatenated)
  const timeElapsed2 = performance.now() - start2
  const reconstructed = reconstructVecVecU8(res2_unit8Array ?? new Uint8Array())
  console.debug(
    `[${filename}][rust wasm] time elapsed ${timeElapsed2.toFixed(
      2,
    )}ms, res2_ptr=`,
    res2_unit8Array,
    "[reconstructed]",
    reconstructed,
  )

  // Example usage:

  const start = performance.now()
  const res = js_native_deserialize_buffers(decoded)
  const timeElapsed = performance.now() - start
  console.debug(
    `[${filename}][js] time elapsed ${timeElapsed.toFixed(2)}ms, res=`,
    res,
  )

  console.debug(
    `[${filename}][isEqual] res,res2 = `,
    isEqual(res, res2_unit8Array),
  )
  console.debug(
    `[${filename}]${timeElapsed2.toFixed(2)}/${timeElapsed.toFixed(
      2,
    )} = ${Number(timeElapsed2 / timeElapsed).toFixed(2)}x (lower the better)`,
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

async function runTest(wasmModule: InitOutput) {
  // let data2 = await fetchBinary("10k_binary.bin")
  // await benchmarkTest(data2, "10k_binary.bin")

  let data = await fetchBinary("1k_binary.bin")
  await benchmarkTest(data, "1k_binary.bin", wasmModule)

  console.debug("[Finish]")
}

const Benchmark: FC<BenchmarkProps> = () => {
  let ran = useRef(false)
  useEffect(() => {
    init().then((wasm) => {
      wasm.memory.grow(100)
      if (ran.current) return

      for (let i = 0; i < 10; i++) {
        runTest(wasm)
      }

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
