import { batch_process_proto_buffers_to_flat_buffers } from "rust_wasm_deserialize"
import { mapMyModelFBToJSON } from "./deserialize_fb"
import { TMyModel } from "./serialize"

export async function processProtobufsNew(
  filename: string,
  protobufBuffers: Uint8Array[],
  iter: number,
  total: number,
): Promise<[number, TMyModel[]]> {
  const start = performance.now()

  // * process protobufs to flatbuffers
  const fbs = batch_process_proto_buffers_to_flat_buffers(protobufBuffers)
  console.debug(
    `[${filename}][rust wasm][processProtobufsNew][process_protobufs][time_elapsed] = ${(
      performance.now() - start
    ).toFixed(2)}ms`,
  )

  // * convert to json
  const start_decode_json = performance.now()
  let results: TMyModel[] = fbs.map(mapMyModelFBToJSON)
  console.debug(
    `[${filename}][rust wasm][processProtobufsNew][mapMyModelFBToJSON][time_elapsed] = ${(
      performance.now() - start_decode_json
    ).toFixed(2)}ms`,
  )

  const timeElapsed = performance.now() - start
  console.log(
    `[${
      iter + 1
    }/${total}][${filename}][rust wasm][processProtobufsNew][total][results][time_elapsed] = ${timeElapsed.toFixed(
      2,
    )}ms`,
  )
  return [timeElapsed, results]
}
