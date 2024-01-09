import { ByteBuffer } from "flatbuffers"
import { mypackage } from "../../my-schema/compiled"
import { CustomMap, MyModel } from "../../mypackage"
import { TMyModel } from "./serialize"

const createEmptyCustomMap = (): Omit<mypackage.CustomMap, "toJSON"> => ({
  b: {},
  d: {},
  l: {},
  s: {},
})

export function convertCustomMapFb(
  customMap: CustomMap | null,
): Omit<mypackage.CustomMap, "toJSON"> {
  if (!customMap) return createEmptyCustomMap()
  const mapObject = createEmptyCustomMap()

  // Assuming `customMap` is your deserialized FlatBuffers CustomMap object
  for (let i = 0; i < customMap.bLength(); i++) {
    const entry = customMap.b(i)
    if (!entry) continue
    const key = entry.key()
    if (!key) continue
    mapObject.b[key] = entry.value()
  }

  for (let i = 0; i < customMap.dLength(); i++) {
    const entry = customMap.d(i)
    if (!entry) continue
    const key = entry.key()
    if (!key) continue
    mapObject.d[key] = entry.value()
  }

  for (let i = 0; i < customMap.sLength(); i++) {
    const entry = customMap.s(i)
    if (!entry) continue
    const key = entry.key()
    if (!key) continue
    mapObject.s[key] = entry.value() ?? ""
  }

  for (let i = 0; i < customMap.lLength(); i++) {
    const entry = customMap.l(i)
    if (!entry) continue
    const key = entry.key()
    if (!key) continue
    mapObject.l[key] = entry.value()
  }
  return mapObject
}

export const mapMyModelFBToJSON = (buf: Uint8Array): TMyModel => {
  const bb = new ByteBuffer(buf)
  const myModelFb = MyModel.getRootAsMyModel(bb)
  const myModel: TMyModel = {
    bool1: myModelFb.bool1(),
    bool2: myModelFb.bool2(),
    bool3: myModelFb.bool3(),
    bool4: myModelFb.bool4(),
    bool5: myModelFb.bool5(),
    bool6: myModelFb.bool6(),

    num1: myModelFb.num1(),
    num2: myModelFb.num2(),
    num3: myModelFb.num3(),
    num4: myModelFb.num4(),
    num5: myModelFb.num5(),
    num6: myModelFb.num6(),

    str1: myModelFb.str1() ?? "",
    str2: myModelFb.str2() ?? "",
    str3: myModelFb.str3() ?? "",
    str4: myModelFb.str4() ?? "",
    str5: myModelFb.str5() ?? "",
    str6: myModelFb.str6() ?? "",

    // oMap: convertCustomMapFb(myModelFb.oMap()),
    // pMap: convertCustomMapFb(myModelFb.pMap()),
    oMap: {},
    pMap: {},
  }
  return myModel
}
