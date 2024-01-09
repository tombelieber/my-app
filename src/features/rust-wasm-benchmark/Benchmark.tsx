import { FC, memo, useEffect, useRef } from "react"
import init from "rust_wasm_deserialize"
import { runTest } from "./runTest"
import { delay } from "./utils"

// * 10 -> 6s, 20 -> 9s, 30 -> 14s, 50 -> 19s
const iter = 30
const wait_time = 2 * 1000

type BenchmarkProps = {}
const Benchmark: FC<BenchmarkProps> = () => {
  let ran = useRef(false)
  useEffect(() => {
    init().then(async (wasm) => {
      if (ran.current) return
      console.log(`start 1k in ${wait_time / 1000}s...`)
      await delay(wait_time)
      await runTest({
        filename: "1k_binary.bin",
        iter,
        wait_time,
      })
      // console.log("start 10k in 3s...")
      // await delay(3000)
      // await runTest({
      //   filename: "10k_binary.bin",
      //   iter,
      //   wait_time,
      // })
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
