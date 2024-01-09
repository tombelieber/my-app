import { TMyModel, deserialize } from "./serialize"

export const js_native_deserialize_buffers = (
  filename: string,
  buffers: Uint8Array[],
  iter: number,
  total: number,
): [number, TMyModel[]] => {
  const start = performance.now()
  const decodedJsons = buffers.map((data) => deserialize(data))
  const timeElapsed = performance.now() - start
  console.log(
    `[${
      iter + 1
    }/${total}][${filename}][js][js_native_deserialize_buffers] time elapsed ${timeElapsed.toFixed(
      2,
    )}ms`,
  )
  return [timeElapsed, decodedJsons]
}
