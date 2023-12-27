import { FC, memo, useEffect } from "react"
import {
  deserialize_array_buffer,
  process_array_buffer,
} from "rust_wasm_deserialize"
import { decodeUint8Arrays } from "./saveAsFile"
import { deserialize } from "./serialize"

// import data_bin from "./1k_binary.bin"

function flattenUint8Arrays(unit8Arrays: Uint8Array[]) {
  const lengths = unit8Arrays.map((buffer) => buffer.length)
  const totalLength = lengths.reduce((a, b) => a + b, 0)
  const flattened = new Uint8Array(totalLength)

  let offset = 0
  for (let buffer of unit8Arrays) {
    flattened.set(buffer, offset)
    offset += buffer.length
  }

  return { flattened, lengths }
}

function encodeUint8ArrayList(arrays) {
  // Calculate total length (4 bytes for each length prefix + array lengths)
  const totalLength = arrays.reduce((acc, arr) => acc + 4 + arr.length, 0)
  const combinedArray = new Uint8Array(totalLength)

  let offset = 0
  arrays.forEach((arr) => {
    // Store the length (assuming 32-bit length, so 4 bytes)
    combinedArray.set(
      new Uint8Array(new Uint32Array([arr.length]).buffer),
      offset,
    )
    offset += 4

    // Store the array
    combinedArray.set(arr, offset)
    offset += arr.length
  })

  return combinedArray.buffer
}

// Example usage
const arrays = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6, 7])]

async function processArrayBuffer(arrayBuffer) {
  try {
    const modelsJson = await deserialize_array_buffer(
      new Uint8Array(arrayBuffer),
    )
    console.log(modelsJson) // Process or display the JSON
  } catch (error) {
    console.error("Error:", error)
  }
}

async function deserializeData(unit8Arrays: Uint8Array[]) {
  const res = processArrayBuffer(unit8Arrays)
  console.debug("res", res)
  // const { flattened, lengths } = flattenUint8Arrays(unit8Arrays)
  // const dataPtr = wasmModule.__wbindgen_malloc(flattened.length)
  // new Uint8Array(wasmModule.memory.buffer, dataPtr, flattened.length).set(
  //   flattened,
  // )
  // const lengthsPtr = wasmModule.__wbindgen_malloc(lengths.length * 4) // 4 bytes per length
  // new Uint32Array(wasmModule.memory.buffer, lengthsPtr, lengths.length).set(
  //   lengths,
  // )
  // try {
  //   const result = wasmModule.deserialize_to_json(
  //     dataPtr,
  //     flattened.length,
  //     lengthsPtr,
  //     lengths.length,
  //   )
  //   console.log(result)
  // } catch (error) {
  //   console.error("Error:", error)
  // } finally {
  //   wasmModule.__wbindgen_free(dataPtr, flattened.length)
  //   wasmModule.__wbindgen_free(lengthsPtr, lengths.length * 4)
  // }
}

// Example usage

const fetchBinary = async (fileName: string) => {
  const res = await fetch(`./${fileName}`).then((res) => {
    return res.arrayBuffer()
  })
  return res
}

// const serialize_data_1k_binary = generateTestData(1_000).map((data) =>
//   serialize(data),
// )
// const serialize_data_10k_binary = generateTestData(10_000).map((data) =>
//   serialize(data),
// )
// const serialize_data_100k_binary = generateTestData(100_000).map((data) =>
//   serialize(data),
// )
// console.debug("data_bin", data_bin)
const deserialize_buffers = (buffers: Uint8Array[]) =>
  buffers.map((data) => deserialize(data))
// const deserialize_10k_binary = () =>
//   serialize_data_10k_binary.map((data) => deserialize(data))
// const deserialize_100k_binary = () =>
//   serialize_data_100k_binary.map((data) => deserialize(data))

type BenchmarkProps = {}

const Benchmark: FC<BenchmarkProps> = () => {
  useEffect(() => {
    fetchBinary("1k_binary.bin").then(async (data) => {
      const start = performance.now()
      const res = deserialize_buffers(decodeUint8Arrays(data))
      console.debug(
        `[1k binary] time elapsed ${performance.now() - start}ms, res=`,
        res,
      )

      const start2 = performance.now()
      const res2 = await processArrayBuffer(decodeUint8Arrays(data))
      // const res2 = await  deserializeData(decodeUint8Arrays(data))
      // Use the previously encoded ArrayBuffer

      console.debug(
        `[1k binary][rust wasm] time elapsed ${
          performance.now() - start2
        }ms, res=`,
        res2,
      )

      return
    })

    // * keep 10k
    // fetchBinary("10k_binary.bin").then((data) => {
    //   const start = performance.now()
    //   const res = deserialize_buffers(decodeUint8Arrays(data))
    //   console.debug(
    //     `[10k binary] time elapsed ${performance.now() - start}ms, res=`,
    //     res,
    //   )
    //   return
    // })
    // fetchBinary("1k_binary.bin").then((data) => {
    //   console.debug("1k binary", decodeUint8Arrays(data))
    //   const start = performance.now()
    //   const res = deserialize_buffers(decodeUint8Arrays(data))
    //   console.debug(`time elapsed ${performance.now() - start}ms, res=`, res)
    //   return
    // })
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
