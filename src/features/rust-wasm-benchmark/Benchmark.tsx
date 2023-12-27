import { isEqual } from "lodash"
import { FC, memo, useEffect } from "react"
import init, { deserialize_array_buffer } from "rust_wasm_deserialize"
import { concatenateUint8Arrays } from "./concatenateUint8Arrays"
import { decodeUint8Arrays } from "./saveAsFile"
import { deserialize } from "./serialize"

async function rustWasmDeserialize(buffer: Uint8Array) {
  try {
    // console.debug(
    //   "[processArrayBuffer][payload] concatenateUint8Arrays(buffers)",
    //   concatenateUint8Arrays(buffers),
    // )
    const modelsJson = await deserialize_array_buffer(buffer)
    // console.log("[processArrayBuffer][res]", modelsJson) // Process or display the JSON
    return modelsJson
  } catch (error) {
    console.error("Error:", error)
  }
}

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
      await init()

      const decoded = decodeUint8Arrays(data)
      const concatenated = concatenateUint8Arrays(decoded)

      const start = performance.now()
      const res = deserialize_buffers(decoded)
      console.debug(
        `[1k binary][js] time elapsed ${performance.now() - start}ms, res=`,
        res,
      )

      const start2 = performance.now()
      const res2 = await rustWasmDeserialize(concatenated)
      console.debug(
        `[1k binary][rust wasm] time elapsed ${
          performance.now() - start2
        }ms, res=`,
        res2,
      )

      console.debug("[isEqual] res,res2 = ", isEqual(res, res2))

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
