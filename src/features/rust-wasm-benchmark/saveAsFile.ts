export function encodeUint8Arrays(arrays: Uint8Array[]): ArrayBuffer {
  // Calculate total length (assuming 4 bytes for each length)
  let totalLength = arrays.reduce((acc, arr) => acc + arr.length + 4, 0)

  // Create a new ArrayBuffer with the total length
  let combinedArrayBuffer = new ArrayBuffer(totalLength)
  let view = new DataView(combinedArrayBuffer)

  let offset = 0
  arrays.forEach((arr) => {
    // Store the length of the array
    view.setUint32(offset, arr.length)
    offset += 4

    // Store the array itself
    let uint8View = new Uint8Array(combinedArrayBuffer, offset, arr.length)
    uint8View.set(arr)
    offset += arr.length
  })

  return combinedArrayBuffer
}

export function decodeUint8Arrays(arrayBuffer: ArrayBuffer) {
  let arrays = []
  let offset = 0
  let view = new DataView(arrayBuffer)

  while (offset < arrayBuffer.byteLength) {
    // Read the length of the current array
    let length = view.getUint32(offset)
    offset += 4

    // Extract the array
    let arr = new Uint8Array(arrayBuffer, offset, length)
    arrays.push(arr)
    offset += length
  }

  return arrays
}

export function saveAsFile(data: Uint8Array[], filename: string) {
  const blob = new Blob([encodeUint8Arrays(data)], {
    type: "application/octet-stream",
  })

  const url = window.URL.createObjectURL(blob)

  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()

  window.URL.revokeObjectURL(url)
  document.body.removeChild(anchor)
}
