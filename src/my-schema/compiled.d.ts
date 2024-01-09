import * as $protobuf from "protobufjs"
import Long = require("long")
/** Namespace mypackage. */
export namespace mypackage {
  /** Properties of a CustomMap. */
  interface ICustomMap {
    /** CustomMap b */
    b?: { [k: string]: boolean } | null

    /** CustomMap d */
    d?: { [k: string]: number } | null

    /** CustomMap s */
    s?: { [k: string]: string } | null

    /** CustomMap l */
    l?: { [k: string]: number } | null
  }

  /** Represents a CustomMap. */
  class CustomMap implements ICustomMap {
    /**
     * Constructs a new CustomMap.
     * @param [properties] Properties to set
     */
    constructor(properties?: mypackage.ICustomMap)

    /** CustomMap b. */
    public b: { [k: string]: boolean }

    /** CustomMap d. */
    public d: { [k: string]: number }

    /** CustomMap s. */
    public s: { [k: string]: string }

    /** CustomMap l. */
    public l: { [k: string]: number }

    /**
     * Creates a new CustomMap instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CustomMap instance
     */
    public static create(properties?: mypackage.ICustomMap): mypackage.CustomMap

    /**
     * Encodes the specified CustomMap message. Does not implicitly {@link mypackage.CustomMap.verify|verify} messages.
     * @param message CustomMap message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: mypackage.ICustomMap,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer

    /**
     * Encodes the specified CustomMap message, length delimited. Does not implicitly {@link mypackage.CustomMap.verify|verify} messages.
     * @param message CustomMap message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: mypackage.ICustomMap,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer

    /**
     * Decodes a CustomMap message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CustomMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): mypackage.CustomMap

    /**
     * Decodes a CustomMap message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CustomMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): mypackage.CustomMap

    /**
     * Verifies a CustomMap message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a CustomMap message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CustomMap
     */
    public static fromObject(object: { [k: string]: any }): mypackage.CustomMap

    /**
     * Creates a plain object from a CustomMap message. Also converts values to other types if specified.
     * @param message CustomMap
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: mypackage.CustomMap,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any }

    /**
     * Converts this CustomMap to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }

    /**
     * Gets the default type url for CustomMap
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string
  }

  /** Properties of a MyModel. */
  interface IMyModel {
    /** MyModel str1 */
    str1?: string | null

    /** MyModel str2 */
    str2?: string | null

    /** MyModel str3 */
    str3?: string | null

    /** MyModel str4 */
    str4?: string | null

    /** MyModel str5 */
    str5?: string | null

    /** MyModel str6 */
    str6?: string | null

    /** MyModel bool1 */
    bool1?: boolean | null

    /** MyModel bool2 */
    bool2?: boolean | null

    /** MyModel bool3 */
    bool3?: boolean | null

    /** MyModel bool4 */
    bool4?: boolean | null

    /** MyModel bool5 */
    bool5?: boolean | null

    /** MyModel bool6 */
    bool6?: boolean | null

    /** MyModel num1 */
    num1?: number | null

    /** MyModel num2 */
    num2?: number | null

    /** MyModel num3 */
    num3?: number | null

    /** MyModel num4 */
    num4?: number | null

    /** MyModel num5 */
    num5?: number | null

    /** MyModel num6 */
    num6?: number | null

    /** MyModel oMap */
    oMap?: mypackage.ICustomMap | null

    /** MyModel pMap */
    pMap?: mypackage.ICustomMap | null
  }

  /** Represents a MyModel. */
  class MyModel implements IMyModel {
    /**
     * Constructs a new MyModel.
     * @param [properties] Properties to set
     */
    constructor(properties?: mypackage.IMyModel)

    /** MyModel str1. */
    public str1: string

    /** MyModel str2. */
    public str2: string

    /** MyModel str3. */
    public str3: string

    /** MyModel str4. */
    public str4: string

    /** MyModel str5. */
    public str5: string

    /** MyModel str6. */
    public str6: string

    /** MyModel bool1. */
    public bool1: boolean

    /** MyModel bool2. */
    public bool2: boolean

    /** MyModel bool3. */
    public bool3: boolean

    /** MyModel bool4. */
    public bool4: boolean

    /** MyModel bool5. */
    public bool5: boolean

    /** MyModel bool6. */
    public bool6: boolean

    /** MyModel num1. */
    public num1: number

    /** MyModel num2. */
    public num2: number

    /** MyModel num3. */
    public num3: number

    /** MyModel num4. */
    public num4: number

    /** MyModel num5. */
    public num5: number

    /** MyModel num6. */
    public num6: number

    /** MyModel oMap. */
    public oMap?: mypackage.ICustomMap | null

    /** MyModel pMap. */
    public pMap?: mypackage.ICustomMap | null

    /**
     * Creates a new MyModel instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MyModel instance
     */
    public static create(properties?: mypackage.IMyModel): mypackage.MyModel

    /**
     * Encodes the specified MyModel message. Does not implicitly {@link mypackage.MyModel.verify|verify} messages.
     * @param message MyModel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: mypackage.IMyModel,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer

    /**
     * Encodes the specified MyModel message, length delimited. Does not implicitly {@link mypackage.MyModel.verify|verify} messages.
     * @param message MyModel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: mypackage.IMyModel,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer

    /**
     * Decodes a MyModel message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MyModel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): mypackage.MyModel

    /**
     * Decodes a MyModel message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MyModel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): mypackage.MyModel

    /**
     * Verifies a MyModel message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a MyModel message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MyModel
     */
    public static fromObject(object: { [k: string]: any }): mypackage.MyModel

    /**
     * Creates a plain object from a MyModel message. Also converts values to other types if specified.
     * @param message MyModel
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: mypackage.MyModel,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any }

    /**
     * Converts this MyModel to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }

    /**
     * Gets the default type url for MyModel
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string
  }
}
