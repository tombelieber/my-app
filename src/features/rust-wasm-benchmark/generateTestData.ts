import { mypackage } from "../../my-schema/compiled"

export type CustomMap = {
  b: { [str: string]: boolean }
  d: { [str: string]: number }
  s: { [str: string]: string }
  l: { [str: string]: number }
}

export type MyModel = {
  str1: string
  str2: string
  str3: string
  str4: string
  str5: string
  str6: string
  bool1: boolean
  bool2: boolean
  bool3: boolean
  bool4: boolean
  bool5: boolean
  bool6: boolean
  num1: number
  num2: number
  num3: number
  num4: number
  num5: number
  num6: number
  oMap: CustomMap
  pMap: CustomMap
}

function generateRandomString(): string {
  return Math.random().toString(36).substring(7)
}

function generateRandomMap(size: number): CustomMap {
  const map: CustomMap = { b: {}, d: {}, s: {}, l: {} }

  for (let i = 0; i < size; i++) {
    map.b[generateRandomString()] = Math.random() > 0.5
    map.d[generateRandomString()] = Math.random()
    map.s[generateRandomString()] = generateRandomString()
    map.l[generateRandomString()] = Math.floor(Math.random() * 100)
  }

  return map
}

// And in the generateTestData function, call it with a size parameter
// Example: generateRandomMap(100) // or any size you deem appropriate
export function generateTestData(n: number): mypackage.IMyModel[] {
  const testData: Required<mypackage.IMyModel>[] = []

  for (let i = 0; i < n; i++) {
    testData.push({
      str1: generateRandomString(),
      str2: generateRandomString(),
      str3: generateRandomString(),
      str4: generateRandomString(),
      str5: generateRandomString(),
      str6: generateRandomString(),
      bool1: Math.random() > 0.5,
      bool2: Math.random() > 0.5,
      bool3: Math.random() > 0.5,
      bool4: Math.random() > 0.5,
      bool5: Math.random() > 0.5,
      bool6: Math.random() > 0.5,
      num1: Math.random(),
      num2: Math.random(),
      num3: Math.random(),
      num4: Math.random(),
      num5: Math.random(),
      num6: Math.random(),
      oMap: generateRandomMap(25),
      pMap: generateRandomMap(25),
    })
  }

  return testData
}
