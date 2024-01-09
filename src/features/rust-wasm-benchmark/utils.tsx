export const fetchBinary = async (fileName: string) => {
  const res = await fetch(`./${fileName}`)
  return res.arrayBuffer()
}
export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms) // 1000 milliseconds = 1 second
  })
}
