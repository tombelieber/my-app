import { isEqual } from "lodash"
import { FlatBufferContainer } from "rust_wasm_deserialize"
import { decodeUint8Arrays } from "./saveAsFile"
import { TMyModel } from "./serialize"
import { processProtobufs } from "./processProtobufs"
import { js_native_deserialize_buffers } from "./js_native_deserialize_buffers"
import { delay, fetchBinary } from "./utils"

export type TestConfig = {
  filename: string
  iter: number
  wait_time: number
}

export type TestResult = {
  type: "js" | "rust"
  timeElapsed: number
  jsons: TMyModel[]
}

export async function runTest({ filename, iter, wait_time }: TestConfig) {
  const start = performance.now()
  console.log(
    `runTest [filename]=${filename}, [iter] = ${iter}, [wait_time] = ${wait_time}ms`,
  )

  // * [Prep] read binary file
  let data = await fetchBinary(filename)
  const protoBuffers = decodeUint8Arrays(data)

  // * [Run Test]
  // * run 10 times Rust WASM
  const rust_results = await runRustTest(iter, filename, protoBuffers)
  console.log(
    `completed, wait for ${(wait_time / 1000).toFixed(2)}s to run rust test...`,
  )

  await delay(wait_time)

  // * run 10 times JS native
  const js_results = await runJSTest(iter, filename, protoBuffers)

  // * [Summary]
  // * compare results by comparing timeElapsed
  const js_times = js_results.map((x) => x.timeElapsed)
  const rust_times = rust_results.map((x) => x.timeElapsed)
  const rust_over_js_times = Array.from({ length: iter }).map(
    (_, index) => rust_times[index] / js_times[index],
  )
  console.log(
    `[summary] [rust_times]/[js_times]`,
    rust_over_js_times,
    " (lower the better)",
    `[js_times]`,
    js_times,
    `[rust_times]`,
    rust_times,
  )

  // * compare results by comparing jsons is Equal
  const isEquals: boolean[] = Array.from({ length: iter }).map((_, index) => {
    const js_jsons = js_results[index].jsons
    const rust_jsons = rust_results[index].jsons
    return isEqual(js_jsons, rust_jsons)
  })
  console.log(`[isEquals] isAllEqual = ${isEquals.every((x) => x)}`, isEquals)
  console.log(
    `************************************************ [runTest][finished] total time ${(
      performance.now() - start
    ).toFixed(2)}ms ************************************************`,
  )
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
      index,
      count,
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
      index,
      count,
    )
    resutls.push({
      type: "rust",
      timeElapsed,
      jsons: fb_jsons,
    })
  }
  return resutls
}
