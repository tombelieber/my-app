import { FlatBufferContainer } from "rust_wasm_deserialize"
import { mapMyModelFBToJSON } from "./deserialize_fb"
import { TMyModel } from "./serialize"

export async function processProtobufs(
  filename: string,
  protobufBuffers: Uint8Array[],
  iter: number,
  total: number,
  container: FlatBufferContainer,
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
  let results: TMyModel[] = container.get_fb_list().map(mapMyModelFBToJSON)
  console.debug(
    `[${filename}][rust wasm][processProtobufs][mapMyModelFBToJSON][time_elapsed] = ${(
      performance.now() - start_decode_json
    ).toFixed(2)}ms`,
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
