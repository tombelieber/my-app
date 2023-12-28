import { mypackage } from "../../my-schema/compiled"

export type TMyModel = Omit<mypackage.MyModel, "toJSON">

export function serialize(data: mypackage.IMyModel): Uint8Array {
  const errMsg = mypackage.MyModel.verify(data)

  if (errMsg) throw Error(errMsg)

  const message = mypackage.MyModel.create(data)
  return mypackage.MyModel.encode(message).finish()
}

export function deserialize(data: Uint8Array): mypackage.MyModel {
  const message = mypackage.MyModel.decode(data)
  return mypackage.MyModel.toObject(message, {
    defaults: true,
  }) as mypackage.MyModel
}
