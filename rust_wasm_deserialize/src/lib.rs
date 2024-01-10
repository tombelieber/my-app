use flatbuffers::{FlatBufferBuilder, ForwardsUOffset, WIPOffset};
use js_sys::Uint8Array;
use prost::Message;
use wasm_bindgen::prelude::*;
mod my_model_generated;
use my_model::{CustomMap, MyModel};
use my_model_generated::mypackage::custom_map_::{
    BEntry, BEntryArgs, DEntry, DEntryArgs, LEntry, LEntryArgs, SEntry, SEntryArgs,
};
use my_model_generated::mypackage::{
    CustomMap as FbCustomMap, CustomMapArgs as FbCustomMapArgs, MyModel as FbMyModel,
    MyModelArgs as FbMyModelArgs,
};
// Include the generated module. The module name will be derived from your .proto file.
pub mod my_model {
    include!(concat!(env!("OUT_DIR"), "/mypackage.rs"));
}

// Use the generated types from your .proto file.

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct FlatBufferContainer {
    buffers: Vec<Vec<u8>>,
}

#[wasm_bindgen]
impl FlatBufferContainer {
    #[wasm_bindgen(constructor)]
    pub fn new() -> FlatBufferContainer {
        FlatBufferContainer {
            buffers: Vec::new(),
        }
    }

    #[wasm_bindgen]
    pub fn process_protobufs(&mut self, buffers: Vec<Uint8Array>) -> Result<(), JsValue> {
        self.buffers.clear();
        for buffer in buffers {
            let buf = &*buffer.to_vec();
            let decoded_model: MyModel = MyModel::decode(buf)
                .map_err(|e: prost::DecodeError| JsValue::from_str(&e.to_string()))?;
            // Encode to FlatBuffer
            let fb: Vec<u8> = encode_model_to_flatbuffer(&decoded_model); // Your existing function
            self.buffers.push(fb);
        }
        Ok(())
    }
    pub fn add_buffer(&mut self, buffer: Vec<u8>) {
        self.buffers.push(buffer);
    }

    pub fn get_buffer_len(&self, index: usize) -> Result<usize, JsValue> {
        self.buffers
            .get(index)
            .map(|b| b.len())
            .ok_or_else(|| JsValue::from_str("Index out of bounds"))
    }

    pub fn get_buffer_ptr(&self, index: usize) -> Result<*const u8, JsValue> {
        self.buffers
            .get(index)
            .map(|b| b.as_ptr())
            .ok_or_else(|| JsValue::from_str("Index out of bounds"))
    }

    pub fn buffer_count(&self) -> usize {
        self.buffers.len()
    }

    #[wasm_bindgen]
    pub fn get_flatbuffer(&self, index: usize) -> Result<Uint8Array, JsValue> {
        self.buffers
            .get(index)
            .map(|buffer| {
                let uint8_array = unsafe { Uint8Array::view(&buffer) };
                uint8_array
            })
            .ok_or_else(|| JsValue::from_str("Index out of bounds"))
    }

    // * return buffers to JS
    pub fn get_fb_list(&self) -> Vec<Uint8Array> {
        let mut fb_list: Vec<Uint8Array> = Vec::new();
        for buffer in self.buffers.iter() {
            let uint8_array = unsafe { Uint8Array::view(&buffer) };
            fb_list.push(uint8_array);
        }
        fb_list
    }

    #[wasm_bindgen]
    pub fn get_flatbuffer_count(&self) -> usize {
        self.buffers.len()
    }
}

#[wasm_bindgen]
pub fn process_single_protobuf(buffer: &[u8]) -> Result<Vec<u8>, JsValue> {
    let decoded_model = MyModel::decode(buffer)
        .map_err(|e| JsValue::from_str(&format!("Decoding error: {}", e)))?;
    let fb: Vec<u8> = encode_model_to_flatbuffer(&decoded_model);
    Ok(fb)
}

pub fn encode_model_to_flatbuffer(model: &MyModel) -> Vec<u8> {
    // * start encoding (building)
    let mut builder: FlatBufferBuilder<'_> = FlatBufferBuilder::new();

    // * prepare string
    let str1_fb: WIPOffset<&str> = builder.create_string(&model.str1);
    let str2_fb: WIPOffset<&str> = builder.create_string(&model.str2);
    let str3_fb: WIPOffset<&str> = builder.create_string(&model.str3);
    let str4_fb: WIPOffset<&str> = builder.create_string(&model.str4);
    let str5_fb: WIPOffset<&str> = builder.create_string(&model.str5);
    let str6_fb: WIPOffset<&str> = builder.create_string(&model.str6);

    // * o_map, p_map instances
    let o_map_offset: Option<WIPOffset<FbCustomMap<'_>>> =
        build_fb_custom_map(&mut builder, &model.o_map);
    let p_map_offset: Option<WIPOffset<FbCustomMap<'_>>> =
        build_fb_custom_map(&mut builder, &model.p_map);

    let my_model_offset: WIPOffset<FbMyModel<'_>> = FbMyModel::create(
        &mut builder,
        &FbMyModelArgs {
            str1: Some(str1_fb),
            str2: Some(str2_fb),
            str3: Some(str3_fb),
            str4: Some(str4_fb),
            str5: Some(str5_fb),
            str6: Some(str6_fb),
            bool1: model.bool1,
            bool2: model.bool2,
            bool3: model.bool3,
            bool4: model.bool4,
            bool5: model.bool5,
            bool6: model.bool6,
            num1: model.num1,
            num2: model.num2,
            num3: model.num3,
            num4: model.num4,
            num5: model.num5,
            num6: model.num6,
            oMap: o_map_offset,
            pMap: p_map_offset,
        },
    );

    // * finish encoding (building)
    builder.finish(my_model_offset, None);

    let buffer: &[u8] = builder.finished_data();
    buffer.to_vec()
}

fn build_fb_custom_map<'a>(
    builder: &mut FlatBufferBuilder<'a>,
    custom_map: &Option<CustomMap>,
) -> Option<WIPOffset<FbCustomMap<'a>>> {
    if let Some(map) = custom_map {
        // Process each map field, for example, b_map
        let b_entries: Vec<_> = map
            .b
            .iter()
            .map(|(key, &value)| {
                let key_fb: WIPOffset<&str> = builder.create_string(key);
                BEntry::create(
                    builder,
                    &BEntryArgs {
                        key: Some(key_fb),
                        value,
                    },
                )
            })
            .collect();
        let b_vector: WIPOffset<flatbuffers::Vector<'_, ForwardsUOffset<BEntry<'_>>>> =
            builder.create_vector(&b_entries);

        let d_entries: Vec<_> = map
            .d
            .iter()
            .map(|(key, &value)| {
                let key_fb: WIPOffset<&str> = builder.create_string(key);
                DEntry::create(
                    builder,
                    &DEntryArgs {
                        key: Some(key_fb),
                        value,
                    },
                )
            })
            .collect();
        let d_vector: WIPOffset<flatbuffers::Vector<'_, ForwardsUOffset<DEntry<'_>>>> =
            builder.create_vector(&d_entries);

        let l_entries: Vec<_> = map
            .l
            .iter()
            .map(|(key, &value)| {
                let key_fb: WIPOffset<&str> = builder.create_string(key);
                LEntry::create(
                    builder,
                    &LEntryArgs {
                        key: Some(key_fb),
                        value,
                    },
                )
            })
            .collect();

        let l_vector: WIPOffset<flatbuffers::Vector<'_, ForwardsUOffset<LEntry<'_>>>> =
            builder.create_vector(&l_entries);

        let s_entries: Vec<_> = map
            .s
            .iter()
            .map(|(key, &ref value)| {
                let key_fb = builder.create_string(key);
                let value = builder.create_string(&value);
                SEntry::create(
                    builder,
                    &SEntryArgs {
                        key: Some(key_fb),
                        value: Some(value),
                    },
                )
            })
            .collect();
        let s_vector: WIPOffset<flatbuffers::Vector<'_, ForwardsUOffset<SEntry<'_>>>> =
            builder.create_vector(&s_entries);

        // Process d_map, s_map, l_map similarly...

        Some(FbCustomMap::create(
            builder,
            &FbCustomMapArgs {
                b: Some(b_vector),
                d: Some(d_vector),
                s: Some(s_vector),
                l: Some(l_vector),
            },
        ))
    } else {
        None
    }
}
