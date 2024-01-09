import { FlatBufferContainer } from "rust_wasm_deserialize"
import { TMyModel } from "./serialize"
import { mapMyModelFBToJSON } from "./deserialize_fb"

export async function processProtobufs(
  filename: string,
  protobufBuffers: Uint8Array[],
  container: FlatBufferContainer,
  iter: number,
  total: number,
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
    `[${
      iter + 1
    }/${total}][${filename}][rust wasm][processProtobufs][total][results][time_elapsed] = ${timeElapsed.toFixed(
      2,
    )}ms`,
  )
  return [timeElapsed, results]
}
