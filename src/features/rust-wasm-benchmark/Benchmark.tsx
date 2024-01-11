import { FC, memo, useEffect, useRef, useState } from "react"
import init from "rust_wasm_deserialize"
import { runTest } from "./runTest"
import { delay } from "./utils"

// * 10 -> 6s, 20 -> 9s, 30 -> 14s, 50 -> 19s

const wait_time = 2 * 1000

type BenchmarkProps = {}
const Benchmark: FC<BenchmarkProps> = () => {
  const [iter, setIter] = useState(20)
  const [checkboxOptions, setCheckboxOptions] = useState({
    "1k": true,
    "10k": false,
  })

  const handleIterChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIter(Number(e.target.value))
  }

  const handleCheckboxChange = (option: "1k" | "10k") => {
    setCheckboxOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ iter, checkboxOptions })

    init().then(async (wasm) => {
      if (checkboxOptions["1k"]) {
        console.log(`start 1k in ${wait_time / 1000}s...`)
        await delay(wait_time)
        await runTest({
          filename: "1k_binary.bin",
          iter,
          wait_time,
        })
      }

      if (checkboxOptions["10k"]) {
        console.log(`start 10k in ${wait_time / 1000}s...`)
        await delay(wait_time)
        await runTest({
          filename: "10k_binary.bin",
          iter,
          wait_time,
        })
      }
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Iter:
          <input type="number" value={iter} onChange={handleIterChange} />
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checkboxOptions["1k"]}
              onChange={() => handleCheckboxChange("1k")}
            />
            1k
          </label>
          <label>
            <input
              type="checkbox"
              checked={checkboxOptions["10k"]}
              onChange={() => handleCheckboxChange("10k")}
            />
            10k
          </label>
        </div>
        <button type="submit">Run</button>
      </form>
      {/* * write a component to take Number input, with label = "iter count" */}
      {/* <button
        onClick={() => {
          // * save serialize_data_1k_binary as file
          // saveAsFile(serialize_data_1k_binary, "1k_binary.bin")
          // saveAsFile(serialize_data_100k_binary, "100k_binary.bin")

          return false // prevent default behavior of form submission (page reload)
        }}
      >
        save binary
      </button> */}
    </>
  )
}

export default memo(Benchmark)
