// import data_bin from "./1k_binary.bin"
// Example usage
export function concatenateUint8Arrays(arrays: Uint8Array[]) {
  // Calculate total length: sum of all arrays + 4 bytes for each length prefix
  const totalLength = arrays.reduce((acc, array) => acc + 4 + array.length, 0)
  const concatenatedArray = new Uint8Array(totalLength)

  let offset = 0
  arrays.forEach((array) => {
    // Create a DataView for length prefixing
    const view = new DataView(concatenatedArray.buffer, offset, 4)
    view.setUint32(0, array.length, true) // true for little-endian
    offset += 4

    concatenatedArray.set(array, offset)
    offset += array.length
  })

  return concatenatedArray
}
