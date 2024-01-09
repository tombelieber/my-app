/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal"

// Common aliases
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {})

export const mypackage = ($root.mypackage = (() => {
  /**
   * Namespace mypackage.
   * @exports mypackage
   * @namespace
   */
  const mypackage = {}

  mypackage.CustomMap = (function () {
    /**
     * Properties of a CustomMap.
     * @memberof mypackage
     * @interface ICustomMap
     * @property {Object.<string,boolean>|null} [b] CustomMap b
     * @property {Object.<string,number>|null} [d] CustomMap d
     * @property {Object.<string,string>|null} [s] CustomMap s
     * @property {Object.<string,number>|null} [l] CustomMap l
     */

    /**
     * Constructs a new CustomMap.
     * @memberof mypackage
     * @classdesc Represents a CustomMap.
     * @implements ICustomMap
     * @constructor
     * @param {mypackage.ICustomMap=} [properties] Properties to set
     */
    function CustomMap(properties) {
      this.b = {}
      this.d = {}
      this.s = {}
      this.l = {}
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * CustomMap b.
     * @member {Object.<string,boolean>} b
     * @memberof mypackage.CustomMap
     * @instance
     */
    CustomMap.prototype.b = $util.emptyObject

    /**
     * CustomMap d.
     * @member {Object.<string,number>} d
     * @memberof mypackage.CustomMap
     * @instance
     */
    CustomMap.prototype.d = $util.emptyObject

    /**
     * CustomMap s.
     * @member {Object.<string,string>} s
     * @memberof mypackage.CustomMap
     * @instance
     */
    CustomMap.prototype.s = $util.emptyObject

    /**
     * CustomMap l.
     * @member {Object.<string,number>} l
     * @memberof mypackage.CustomMap
     * @instance
     */
    CustomMap.prototype.l = $util.emptyObject

    /**
     * Creates a new CustomMap instance using the specified properties.
     * @function create
     * @memberof mypackage.CustomMap
     * @static
     * @param {mypackage.ICustomMap=} [properties] Properties to set
     * @returns {mypackage.CustomMap} CustomMap instance
     */
    CustomMap.create = function create(properties) {
      return new CustomMap(properties)
    }

    /**
     * Encodes the specified CustomMap message. Does not implicitly {@link mypackage.CustomMap.verify|verify} messages.
     * @function encode
     * @memberof mypackage.CustomMap
     * @static
     * @param {mypackage.ICustomMap} message CustomMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CustomMap.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.b != null && Object.hasOwnProperty.call(message, "b"))
        for (let keys = Object.keys(message.b), i = 0; i < keys.length; ++i)
          writer
            .uint32(/* id 1, wireType 2 =*/ 10)
            .fork()
            .uint32(/* id 1, wireType 2 =*/ 10)
            .string(keys[i])
            .uint32(/* id 2, wireType 0 =*/ 16)
            .bool(message.b[keys[i]])
            .ldelim()
      if (message.d != null && Object.hasOwnProperty.call(message, "d"))
        for (let keys = Object.keys(message.d), i = 0; i < keys.length; ++i)
          writer
            .uint32(/* id 2, wireType 2 =*/ 18)
            .fork()
            .uint32(/* id 1, wireType 2 =*/ 10)
            .string(keys[i])
            .uint32(/* id 2, wireType 1 =*/ 17)
            .double(message.d[keys[i]])
            .ldelim()
      if (message.s != null && Object.hasOwnProperty.call(message, "s"))
        for (let keys = Object.keys(message.s), i = 0; i < keys.length; ++i)
          writer
            .uint32(/* id 3, wireType 2 =*/ 26)
            .fork()
            .uint32(/* id 1, wireType 2 =*/ 10)
            .string(keys[i])
            .uint32(/* id 2, wireType 2 =*/ 18)
            .string(message.s[keys[i]])
            .ldelim()
      if (message.l != null && Object.hasOwnProperty.call(message, "l"))
        for (let keys = Object.keys(message.l), i = 0; i < keys.length; ++i)
          writer
            .uint32(/* id 4, wireType 2 =*/ 34)
            .fork()
            .uint32(/* id 1, wireType 2 =*/ 10)
            .string(keys[i])
            .uint32(/* id 2, wireType 1 =*/ 17)
            .double(message.l[keys[i]])
            .ldelim()
      return writer
    }

    /**
     * Encodes the specified CustomMap message, length delimited. Does not implicitly {@link mypackage.CustomMap.verify|verify} messages.
     * @function encodeDelimited
     * @memberof mypackage.CustomMap
     * @static
     * @param {mypackage.ICustomMap} message CustomMap message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CustomMap.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a CustomMap message from the specified reader or buffer.
     * @function decode
     * @memberof mypackage.CustomMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {mypackage.CustomMap} CustomMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CustomMap.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.mypackage.CustomMap(),
        key,
        value
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            if (message.b === $util.emptyObject) message.b = {}
            let end2 = reader.uint32() + reader.pos
            key = ""
            value = false
            while (reader.pos < end2) {
              let tag2 = reader.uint32()
              switch (tag2 >>> 3) {
                case 1:
                  key = reader.string()
                  break
                case 2:
                  value = reader.bool()
                  break
                default:
                  reader.skipType(tag2 & 7)
                  break
              }
            }
            message.b[key] = value
            break
          }
          case 2: {
            if (message.d === $util.emptyObject) message.d = {}
            let end2 = reader.uint32() + reader.pos
            key = ""
            value = 0
            while (reader.pos < end2) {
              let tag2 = reader.uint32()
              switch (tag2 >>> 3) {
                case 1:
                  key = reader.string()
                  break
                case 2:
                  value = reader.double()
                  break
                default:
                  reader.skipType(tag2 & 7)
                  break
              }
            }
            message.d[key] = value
            break
          }
          case 3: {
            if (message.s === $util.emptyObject) message.s = {}
            let end2 = reader.uint32() + reader.pos
            key = ""
            value = ""
            while (reader.pos < end2) {
              let tag2 = reader.uint32()
              switch (tag2 >>> 3) {
                case 1:
                  key = reader.string()
                  break
                case 2:
                  value = reader.string()
                  break
                default:
                  reader.skipType(tag2 & 7)
                  break
              }
            }
            message.s[key] = value
            break
          }
          case 4: {
            if (message.l === $util.emptyObject) message.l = {}
            let end2 = reader.uint32() + reader.pos
            key = ""
            value = 0
            while (reader.pos < end2) {
              let tag2 = reader.uint32()
              switch (tag2 >>> 3) {
                case 1:
                  key = reader.string()
                  break
                case 2:
                  value = reader.double()
                  break
                default:
                  reader.skipType(tag2 & 7)
                  break
              }
            }
            message.l[key] = value
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a CustomMap message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof mypackage.CustomMap
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {mypackage.CustomMap} CustomMap
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CustomMap.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a CustomMap message.
     * @function verify
     * @memberof mypackage.CustomMap
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CustomMap.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected"
      if (message.b != null && message.hasOwnProperty("b")) {
        if (!$util.isObject(message.b)) return "b: object expected"
        let key = Object.keys(message.b)
        for (let i = 0; i < key.length; ++i)
          if (typeof message.b[key[i]] !== "boolean")
            return "b: boolean{k:string} expected"
      }
      if (message.d != null && message.hasOwnProperty("d")) {
        if (!$util.isObject(message.d)) return "d: object expected"
        let key = Object.keys(message.d)
        for (let i = 0; i < key.length; ++i)
          if (typeof message.d[key[i]] !== "number")
            return "d: number{k:string} expected"
      }
      if (message.s != null && message.hasOwnProperty("s")) {
        if (!$util.isObject(message.s)) return "s: object expected"
        let key = Object.keys(message.s)
        for (let i = 0; i < key.length; ++i)
          if (!$util.isString(message.s[key[i]]))
            return "s: string{k:string} expected"
      }
      if (message.l != null && message.hasOwnProperty("l")) {
        if (!$util.isObject(message.l)) return "l: object expected"
        let key = Object.keys(message.l)
        for (let i = 0; i < key.length; ++i)
          if (typeof message.l[key[i]] !== "number")
            return "l: number{k:string} expected"
      }
      return null
    }

    /**
     * Creates a CustomMap message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof mypackage.CustomMap
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {mypackage.CustomMap} CustomMap
     */
    CustomMap.fromObject = function fromObject(object) {
      if (object instanceof $root.mypackage.CustomMap) return object
      let message = new $root.mypackage.CustomMap()
      if (object.b) {
        if (typeof object.b !== "object")
          throw TypeError(".mypackage.CustomMap.b: object expected")
        message.b = {}
        for (let keys = Object.keys(object.b), i = 0; i < keys.length; ++i)
          message.b[keys[i]] = Boolean(object.b[keys[i]])
      }
      if (object.d) {
        if (typeof object.d !== "object")
          throw TypeError(".mypackage.CustomMap.d: object expected")
        message.d = {}
        for (let keys = Object.keys(object.d), i = 0; i < keys.length; ++i)
          message.d[keys[i]] = Number(object.d[keys[i]])
      }
      if (object.s) {
        if (typeof object.s !== "object")
          throw TypeError(".mypackage.CustomMap.s: object expected")
        message.s = {}
        for (let keys = Object.keys(object.s), i = 0; i < keys.length; ++i)
          message.s[keys[i]] = String(object.s[keys[i]])
      }
      if (object.l) {
        if (typeof object.l !== "object")
          throw TypeError(".mypackage.CustomMap.l: object expected")
        message.l = {}
        for (let keys = Object.keys(object.l), i = 0; i < keys.length; ++i)
          message.l[keys[i]] = Number(object.l[keys[i]])
      }
      return message
    }

    /**
     * Creates a plain object from a CustomMap message. Also converts values to other types if specified.
     * @function toObject
     * @memberof mypackage.CustomMap
     * @static
     * @param {mypackage.CustomMap} message CustomMap
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CustomMap.toObject = function toObject(message, options) {
      if (!options) options = {}
      let object = {}
      if (options.objects || options.defaults) {
        object.b = {}
        object.d = {}
        object.s = {}
        object.l = {}
      }
      let keys2
      if (message.b && (keys2 = Object.keys(message.b)).length) {
        object.b = {}
        for (let j = 0; j < keys2.length; ++j)
          object.b[keys2[j]] = message.b[keys2[j]]
      }
      if (message.d && (keys2 = Object.keys(message.d)).length) {
        object.d = {}
        for (let j = 0; j < keys2.length; ++j)
          object.d[keys2[j]] =
            options.json && !isFinite(message.d[keys2[j]])
              ? String(message.d[keys2[j]])
              : message.d[keys2[j]]
      }
      if (message.s && (keys2 = Object.keys(message.s)).length) {
        object.s = {}
        for (let j = 0; j < keys2.length; ++j)
          object.s[keys2[j]] = message.s[keys2[j]]
      }
      if (message.l && (keys2 = Object.keys(message.l)).length) {
        object.l = {}
        for (let j = 0; j < keys2.length; ++j)
          object.l[keys2[j]] =
            options.json && !isFinite(message.l[keys2[j]])
              ? String(message.l[keys2[j]])
              : message.l[keys2[j]]
      }
      return object
    }

    /**
     * Converts this CustomMap to JSON.
     * @function toJSON
     * @memberof mypackage.CustomMap
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CustomMap.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for CustomMap
     * @function getTypeUrl
     * @memberof mypackage.CustomMap
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    CustomMap.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com"
      }
      return typeUrlPrefix + "/mypackage.CustomMap"
    }

    return CustomMap
  })()

  mypackage.MyModel = (function () {
    /**
     * Properties of a MyModel.
     * @memberof mypackage
     * @interface IMyModel
     * @property {string|null} [str1] MyModel str1
     * @property {string|null} [str2] MyModel str2
     * @property {string|null} [str3] MyModel str3
     * @property {string|null} [str4] MyModel str4
     * @property {string|null} [str5] MyModel str5
     * @property {string|null} [str6] MyModel str6
     * @property {boolean|null} [bool1] MyModel bool1
     * @property {boolean|null} [bool2] MyModel bool2
     * @property {boolean|null} [bool3] MyModel bool3
     * @property {boolean|null} [bool4] MyModel bool4
     * @property {boolean|null} [bool5] MyModel bool5
     * @property {boolean|null} [bool6] MyModel bool6
     * @property {number|null} [num1] MyModel num1
     * @property {number|null} [num2] MyModel num2
     * @property {number|null} [num3] MyModel num3
     * @property {number|null} [num4] MyModel num4
     * @property {number|null} [num5] MyModel num5
     * @property {number|null} [num6] MyModel num6
     * @property {mypackage.ICustomMap|null} [oMap] MyModel oMap
     * @property {mypackage.ICustomMap|null} [pMap] MyModel pMap
     */

    /**
     * Constructs a new MyModel.
     * @memberof mypackage
     * @classdesc Represents a MyModel.
     * @implements IMyModel
     * @constructor
     * @param {mypackage.IMyModel=} [properties] Properties to set
     */
    function MyModel(properties) {
      if (properties)
        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
    }

    /**
     * MyModel str1.
     * @member {string} str1
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.str1 = ""

    /**
     * MyModel str2.
     * @member {string} str2
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.str2 = ""

    /**
     * MyModel str3.
     * @member {string} str3
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.str3 = ""

    /**
     * MyModel str4.
     * @member {string} str4
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.str4 = ""

    /**
     * MyModel str5.
     * @member {string} str5
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.str5 = ""

    /**
     * MyModel str6.
     * @member {string} str6
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.str6 = ""

    /**
     * MyModel bool1.
     * @member {boolean} bool1
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.bool1 = false

    /**
     * MyModel bool2.
     * @member {boolean} bool2
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.bool2 = false

    /**
     * MyModel bool3.
     * @member {boolean} bool3
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.bool3 = false

    /**
     * MyModel bool4.
     * @member {boolean} bool4
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.bool4 = false

    /**
     * MyModel bool5.
     * @member {boolean} bool5
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.bool5 = false

    /**
     * MyModel bool6.
     * @member {boolean} bool6
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.bool6 = false

    /**
     * MyModel num1.
     * @member {number} num1
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.num1 = 0

    /**
     * MyModel num2.
     * @member {number} num2
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.num2 = 0

    /**
     * MyModel num3.
     * @member {number} num3
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.num3 = 0

    /**
     * MyModel num4.
     * @member {number} num4
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.num4 = 0

    /**
     * MyModel num5.
     * @member {number} num5
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.num5 = 0

    /**
     * MyModel num6.
     * @member {number} num6
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.num6 = 0

    /**
     * MyModel oMap.
     * @member {mypackage.ICustomMap|null|undefined} oMap
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.oMap = null

    /**
     * MyModel pMap.
     * @member {mypackage.ICustomMap|null|undefined} pMap
     * @memberof mypackage.MyModel
     * @instance
     */
    MyModel.prototype.pMap = null

    /**
     * Creates a new MyModel instance using the specified properties.
     * @function create
     * @memberof mypackage.MyModel
     * @static
     * @param {mypackage.IMyModel=} [properties] Properties to set
     * @returns {mypackage.MyModel} MyModel instance
     */
    MyModel.create = function create(properties) {
      return new MyModel(properties)
    }

    /**
     * Encodes the specified MyModel message. Does not implicitly {@link mypackage.MyModel.verify|verify} messages.
     * @function encode
     * @memberof mypackage.MyModel
     * @static
     * @param {mypackage.IMyModel} message MyModel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyModel.encode = function encode(message, writer) {
      if (!writer) writer = $Writer.create()
      if (message.str1 != null && Object.hasOwnProperty.call(message, "str1"))
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.str1)
      if (message.str2 != null && Object.hasOwnProperty.call(message, "str2"))
        writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.str2)
      if (message.str3 != null && Object.hasOwnProperty.call(message, "str3"))
        writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.str3)
      if (message.str4 != null && Object.hasOwnProperty.call(message, "str4"))
        writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.str4)
      if (message.str5 != null && Object.hasOwnProperty.call(message, "str5"))
        writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.str5)
      if (message.str6 != null && Object.hasOwnProperty.call(message, "str6"))
        writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.str6)
      if (message.bool1 != null && Object.hasOwnProperty.call(message, "bool1"))
        writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.bool1)
      if (message.bool2 != null && Object.hasOwnProperty.call(message, "bool2"))
        writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.bool2)
      if (message.bool3 != null && Object.hasOwnProperty.call(message, "bool3"))
        writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.bool3)
      if (message.bool4 != null && Object.hasOwnProperty.call(message, "bool4"))
        writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.bool4)
      if (message.bool5 != null && Object.hasOwnProperty.call(message, "bool5"))
        writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.bool5)
      if (message.bool6 != null && Object.hasOwnProperty.call(message, "bool6"))
        writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.bool6)
      if (message.num1 != null && Object.hasOwnProperty.call(message, "num1"))
        writer.uint32(/* id 13, wireType 1 =*/ 105).double(message.num1)
      if (message.num2 != null && Object.hasOwnProperty.call(message, "num2"))
        writer.uint32(/* id 14, wireType 1 =*/ 113).double(message.num2)
      if (message.num3 != null && Object.hasOwnProperty.call(message, "num3"))
        writer.uint32(/* id 15, wireType 1 =*/ 121).double(message.num3)
      if (message.num4 != null && Object.hasOwnProperty.call(message, "num4"))
        writer.uint32(/* id 16, wireType 1 =*/ 129).double(message.num4)
      if (message.num5 != null && Object.hasOwnProperty.call(message, "num5"))
        writer.uint32(/* id 17, wireType 1 =*/ 137).double(message.num5)
      if (message.num6 != null && Object.hasOwnProperty.call(message, "num6"))
        writer.uint32(/* id 18, wireType 1 =*/ 145).double(message.num6)
      if (message.oMap != null && Object.hasOwnProperty.call(message, "oMap"))
        $root.mypackage.CustomMap.encode(
          message.oMap,
          writer.uint32(/* id 19, wireType 2 =*/ 154).fork(),
        ).ldelim()
      if (message.pMap != null && Object.hasOwnProperty.call(message, "pMap"))
        $root.mypackage.CustomMap.encode(
          message.pMap,
          writer.uint32(/* id 20, wireType 2 =*/ 162).fork(),
        ).ldelim()
      return writer
    }

    /**
     * Encodes the specified MyModel message, length delimited. Does not implicitly {@link mypackage.MyModel.verify|verify} messages.
     * @function encodeDelimited
     * @memberof mypackage.MyModel
     * @static
     * @param {mypackage.IMyModel} message MyModel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MyModel.encodeDelimited = function encodeDelimited(message, writer) {
      return this.encode(message, writer).ldelim()
    }

    /**
     * Decodes a MyModel message from the specified reader or buffer.
     * @function decode
     * @memberof mypackage.MyModel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {mypackage.MyModel} MyModel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MyModel.decode = function decode(reader, length) {
      if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
      let end = length === undefined ? reader.len : reader.pos + length,
        message = new $root.mypackage.MyModel()
      while (reader.pos < end) {
        let tag = reader.uint32()
        switch (tag >>> 3) {
          case 1: {
            message.str1 = reader.string()
            break
          }
          case 2: {
            message.str2 = reader.string()
            break
          }
          case 3: {
            message.str3 = reader.string()
            break
          }
          case 4: {
            message.str4 = reader.string()
            break
          }
          case 5: {
            message.str5 = reader.string()
            break
          }
          case 6: {
            message.str6 = reader.string()
            break
          }
          case 7: {
            message.bool1 = reader.bool()
            break
          }
          case 8: {
            message.bool2 = reader.bool()
            break
          }
          case 9: {
            message.bool3 = reader.bool()
            break
          }
          case 10: {
            message.bool4 = reader.bool()
            break
          }
          case 11: {
            message.bool5 = reader.bool()
            break
          }
          case 12: {
            message.bool6 = reader.bool()
            break
          }
          case 13: {
            message.num1 = reader.double()
            break
          }
          case 14: {
            message.num2 = reader.double()
            break
          }
          case 15: {
            message.num3 = reader.double()
            break
          }
          case 16: {
            message.num4 = reader.double()
            break
          }
          case 17: {
            message.num5 = reader.double()
            break
          }
          case 18: {
            message.num6 = reader.double()
            break
          }
          case 19: {
            message.oMap = $root.mypackage.CustomMap.decode(
              reader,
              reader.uint32(),
            )
            break
          }
          case 20: {
            message.pMap = $root.mypackage.CustomMap.decode(
              reader,
              reader.uint32(),
            )
            break
          }
          default:
            reader.skipType(tag & 7)
            break
        }
      }
      return message
    }

    /**
     * Decodes a MyModel message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof mypackage.MyModel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {mypackage.MyModel} MyModel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MyModel.decodeDelimited = function decodeDelimited(reader) {
      if (!(reader instanceof $Reader)) reader = new $Reader(reader)
      return this.decode(reader, reader.uint32())
    }

    /**
     * Verifies a MyModel message.
     * @function verify
     * @memberof mypackage.MyModel
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MyModel.verify = function verify(message) {
      if (typeof message !== "object" || message === null)
        return "object expected"
      if (message.str1 != null && message.hasOwnProperty("str1"))
        if (!$util.isString(message.str1)) return "str1: string expected"
      if (message.str2 != null && message.hasOwnProperty("str2"))
        if (!$util.isString(message.str2)) return "str2: string expected"
      if (message.str3 != null && message.hasOwnProperty("str3"))
        if (!$util.isString(message.str3)) return "str3: string expected"
      if (message.str4 != null && message.hasOwnProperty("str4"))
        if (!$util.isString(message.str4)) return "str4: string expected"
      if (message.str5 != null && message.hasOwnProperty("str5"))
        if (!$util.isString(message.str5)) return "str5: string expected"
      if (message.str6 != null && message.hasOwnProperty("str6"))
        if (!$util.isString(message.str6)) return "str6: string expected"
      if (message.bool1 != null && message.hasOwnProperty("bool1"))
        if (typeof message.bool1 !== "boolean") return "bool1: boolean expected"
      if (message.bool2 != null && message.hasOwnProperty("bool2"))
        if (typeof message.bool2 !== "boolean") return "bool2: boolean expected"
      if (message.bool3 != null && message.hasOwnProperty("bool3"))
        if (typeof message.bool3 !== "boolean") return "bool3: boolean expected"
      if (message.bool4 != null && message.hasOwnProperty("bool4"))
        if (typeof message.bool4 !== "boolean") return "bool4: boolean expected"
      if (message.bool5 != null && message.hasOwnProperty("bool5"))
        if (typeof message.bool5 !== "boolean") return "bool5: boolean expected"
      if (message.bool6 != null && message.hasOwnProperty("bool6"))
        if (typeof message.bool6 !== "boolean") return "bool6: boolean expected"
      if (message.num1 != null && message.hasOwnProperty("num1"))
        if (typeof message.num1 !== "number") return "num1: number expected"
      if (message.num2 != null && message.hasOwnProperty("num2"))
        if (typeof message.num2 !== "number") return "num2: number expected"
      if (message.num3 != null && message.hasOwnProperty("num3"))
        if (typeof message.num3 !== "number") return "num3: number expected"
      if (message.num4 != null && message.hasOwnProperty("num4"))
        if (typeof message.num4 !== "number") return "num4: number expected"
      if (message.num5 != null && message.hasOwnProperty("num5"))
        if (typeof message.num5 !== "number") return "num5: number expected"
      if (message.num6 != null && message.hasOwnProperty("num6"))
        if (typeof message.num6 !== "number") return "num6: number expected"
      if (message.oMap != null && message.hasOwnProperty("oMap")) {
        let error = $root.mypackage.CustomMap.verify(message.oMap)
        if (error) return "oMap." + error
      }
      if (message.pMap != null && message.hasOwnProperty("pMap")) {
        let error = $root.mypackage.CustomMap.verify(message.pMap)
        if (error) return "pMap." + error
      }
      return null
    }

    /**
     * Creates a MyModel message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof mypackage.MyModel
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {mypackage.MyModel} MyModel
     */
    MyModel.fromObject = function fromObject(object) {
      if (object instanceof $root.mypackage.MyModel) return object
      let message = new $root.mypackage.MyModel()
      if (object.str1 != null) message.str1 = String(object.str1)
      if (object.str2 != null) message.str2 = String(object.str2)
      if (object.str3 != null) message.str3 = String(object.str3)
      if (object.str4 != null) message.str4 = String(object.str4)
      if (object.str5 != null) message.str5 = String(object.str5)
      if (object.str6 != null) message.str6 = String(object.str6)
      if (object.bool1 != null) message.bool1 = Boolean(object.bool1)
      if (object.bool2 != null) message.bool2 = Boolean(object.bool2)
      if (object.bool3 != null) message.bool3 = Boolean(object.bool3)
      if (object.bool4 != null) message.bool4 = Boolean(object.bool4)
      if (object.bool5 != null) message.bool5 = Boolean(object.bool5)
      if (object.bool6 != null) message.bool6 = Boolean(object.bool6)
      if (object.num1 != null) message.num1 = Number(object.num1)
      if (object.num2 != null) message.num2 = Number(object.num2)
      if (object.num3 != null) message.num3 = Number(object.num3)
      if (object.num4 != null) message.num4 = Number(object.num4)
      if (object.num5 != null) message.num5 = Number(object.num5)
      if (object.num6 != null) message.num6 = Number(object.num6)
      if (object.oMap != null) {
        if (typeof object.oMap !== "object")
          throw TypeError(".mypackage.MyModel.oMap: object expected")
        message.oMap = $root.mypackage.CustomMap.fromObject(object.oMap)
      }
      if (object.pMap != null) {
        if (typeof object.pMap !== "object")
          throw TypeError(".mypackage.MyModel.pMap: object expected")
        message.pMap = $root.mypackage.CustomMap.fromObject(object.pMap)
      }
      return message
    }

    /**
     * Creates a plain object from a MyModel message. Also converts values to other types if specified.
     * @function toObject
     * @memberof mypackage.MyModel
     * @static
     * @param {mypackage.MyModel} message MyModel
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MyModel.toObject = function toObject(message, options) {
      if (!options) options = {}
      let object = {}
      if (options.defaults) {
        object.str1 = ""
        object.str2 = ""
        object.str3 = ""
        object.str4 = ""
        object.str5 = ""
        object.str6 = ""
        object.bool1 = false
        object.bool2 = false
        object.bool3 = false
        object.bool4 = false
        object.bool5 = false
        object.bool6 = false
        object.num1 = 0
        object.num2 = 0
        object.num3 = 0
        object.num4 = 0
        object.num5 = 0
        object.num6 = 0
        object.oMap = null
        object.pMap = null
      }
      if (message.str1 != null && message.hasOwnProperty("str1"))
        object.str1 = message.str1
      if (message.str2 != null && message.hasOwnProperty("str2"))
        object.str2 = message.str2
      if (message.str3 != null && message.hasOwnProperty("str3"))
        object.str3 = message.str3
      if (message.str4 != null && message.hasOwnProperty("str4"))
        object.str4 = message.str4
      if (message.str5 != null && message.hasOwnProperty("str5"))
        object.str5 = message.str5
      if (message.str6 != null && message.hasOwnProperty("str6"))
        object.str6 = message.str6
      if (message.bool1 != null && message.hasOwnProperty("bool1"))
        object.bool1 = message.bool1
      if (message.bool2 != null && message.hasOwnProperty("bool2"))
        object.bool2 = message.bool2
      if (message.bool3 != null && message.hasOwnProperty("bool3"))
        object.bool3 = message.bool3
      if (message.bool4 != null && message.hasOwnProperty("bool4"))
        object.bool4 = message.bool4
      if (message.bool5 != null && message.hasOwnProperty("bool5"))
        object.bool5 = message.bool5
      if (message.bool6 != null && message.hasOwnProperty("bool6"))
        object.bool6 = message.bool6
      if (message.num1 != null && message.hasOwnProperty("num1"))
        object.num1 =
          options.json && !isFinite(message.num1)
            ? String(message.num1)
            : message.num1
      if (message.num2 != null && message.hasOwnProperty("num2"))
        object.num2 =
          options.json && !isFinite(message.num2)
            ? String(message.num2)
            : message.num2
      if (message.num3 != null && message.hasOwnProperty("num3"))
        object.num3 =
          options.json && !isFinite(message.num3)
            ? String(message.num3)
            : message.num3
      if (message.num4 != null && message.hasOwnProperty("num4"))
        object.num4 =
          options.json && !isFinite(message.num4)
            ? String(message.num4)
            : message.num4
      if (message.num5 != null && message.hasOwnProperty("num5"))
        object.num5 =
          options.json && !isFinite(message.num5)
            ? String(message.num5)
            : message.num5
      if (message.num6 != null && message.hasOwnProperty("num6"))
        object.num6 =
          options.json && !isFinite(message.num6)
            ? String(message.num6)
            : message.num6
      if (message.oMap != null && message.hasOwnProperty("oMap"))
        object.oMap = $root.mypackage.CustomMap.toObject(message.oMap, options)
      if (message.pMap != null && message.hasOwnProperty("pMap"))
        object.pMap = $root.mypackage.CustomMap.toObject(message.pMap, options)
      return object
    }

    /**
     * Converts this MyModel to JSON.
     * @function toJSON
     * @memberof mypackage.MyModel
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MyModel.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
    }

    /**
     * Gets the default type url for MyModel
     * @function getTypeUrl
     * @memberof mypackage.MyModel
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MyModel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
      if (typeUrlPrefix === undefined) {
        typeUrlPrefix = "type.googleapis.com"
      }
      return typeUrlPrefix + "/mypackage.MyModel"
    }

    return MyModel
  })()

  return mypackage
})())

export { $root as default }
