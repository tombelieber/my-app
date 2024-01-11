import { clone, isEqual } from "lodash"
import { FlatBufferContainer } from "rust_wasm_deserialize"
import { js_native_deserialize_buffers } from "./js_native_deserialize_buffers"
import { processProtobufs } from "./processProtobufs"
import { processProtobufsNew } from "./processProtobufsNew"
import { decodeUint8Arrays } from "./saveAsFile"
import { TMyModel } from "./serialize"
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
    `[rust] completed, wait for ${(wait_time / 1000).toFixed(
      2,
    )}s to run rust2 test...`,
  )

  await delay(wait_time)

  // * run 10 times JS native
  const rust_results_2 = await runRustTest2(iter, filename, protoBuffers)
  console.log(
    `[rust2] completed, wait for ${(wait_time / 1000).toFixed(
      2,
    )}s to run JS...`,
  )

  await delay(wait_time)

  const js_results = await runJSTest(iter, filename, protoBuffers)

  await delay(wait_time)

  await delay(wait_time)

  // * [Summary]
  // * compare results by comparing timeElapsed
  const js_times = js_results.map((x) => x.timeElapsed)
  const rust_times_2 = rust_results_2.map((x) => x.timeElapsed)
  const rust_times = rust_results.map((x) => x.timeElapsed)
  const rust_2_over_rust_times = Array.from({ length: iter }).map(
    (_, index) => rust_times_2[index] / rust_times[index],
  )
  const rust_2_over_js_times = Array.from({ length: iter }).map(
    (_, index) => rust_times_2[index] / js_times[index],
  )

  console.log(
    `[summary] [rust_times2]/[rust_times]  (lower the better)`,
    rust_2_over_rust_times,
    "[rust_times2]/[js_times]  (lower the better)",
    rust_2_over_js_times,
    `[rust_times2]`,
    rust_times_2,
    `[rust_times]`,
    rust_times,
    `[js_times]`,
    js_times,
  )

  const js_results_without_o_p = js_results.map(({ jsons }) =>
    jsons.map((e) => ({
      ...e,
      oMap: {},
      pMap: {},
    })),
  )

  // * compare results by comparing jsons is Equal
  const is_rust_equal_to_js = rust_results.map(({ jsons }, i) =>
    isEqual(jsons, js_results_without_o_p[i]),
  )
  const is_rust_2_equal_to_js = rust_results_2.map(({ jsons }, i) =>
    isEqual(jsons, js_results_without_o_p[i]),
  )

  console.log(
    `[isEquals] rust = ${is_rust_equal_to_js.every((x) => x)}`,
    is_rust_equal_to_js,
  )
  console.log(
    `[isEquals] rust_2 = ${is_rust_2_equal_to_js.every((x) => x)}`,
    is_rust_equal_to_js,
  )
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
      index,
      count,
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

const runRustTest2 = async (
  count: number,
  filename: string,
  protoBuffers: Uint8Array[],
): Promise<TestResult[]> => {
  let resutls: TestResult[] = []
  for (let index = 0; index < count; index++) {
    // * native js
    const [timeElapsed, fb_jsons] = await processProtobufsNew(
      filename,
      protoBuffers,
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
