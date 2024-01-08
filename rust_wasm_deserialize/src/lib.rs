use js_sys::Uint8Array;
use prost::Message;
use wasm_bindgen::prelude::*;
use web_sys::window;

use flatbuffers::{FlatBufferBuilder, ForwardsUOffset, WIPOffset};
// use my_model_generated::MyModel as FbMyModel; // Adjust import according to your generated code
// use mypackage::my_model::MyModel as FbMyModel;
mod my_model_generated;
use my_model_generated::mypackage::{
    CustomMap as FbCustomMap, CustomMapArgs as FbCustomMapArgs, MyModel as FbMyModel,
    MyModelArgs as FbMyModelArgs,
};

use my_model_generated::mypackage::custom_map_::{
    BEntry, BEntryArgs, DEntry, DEntryArgs, LEntry, LEntryArgs, SEntry, SEntryArgs,
};

// Include the generated module. The module name will be derived from your .proto file.
pub mod my_model {
    include!(concat!(env!("OUT_DIR"), "/mypackage.rs"));
}

// Use the generated types from your .proto file.
use my_model::{CustomMap, MyModel};

#[wasm_bindgen]
pub fn deserialize_to_json(
    data_ptr: *const u8,
    data_len: usize,
    lengths_ptr: *const u32,
    lengths_len: usize,
) -> Result<JsValue, JsValue> {
    let data = unsafe { std::slice::from_raw_parts(data_ptr, data_len) };
    let lengths = unsafe { std::slice::from_raw_parts(lengths_ptr, lengths_len) };

    let mut offset = 0;
    let mut models = Vec::new();
    for &len in lengths {
        let end = offset + len as usize;
        let my_model = MyModel::decode(&data[offset..end])
            .map_err(|e| JsValue::from_str(&format!("Failed to decode Protobuf: {}", e)))?;
        models.push(my_model);
        offset = end;
    }

    JsValue::from_serde(&models)
        .map_err(|e| JsValue::from_str(&format!("Failed to serialize to JSON: {}", e)))
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn process_array_buffer(pointer: *const u8, length: usize) {
    let slice = unsafe { std::slice::from_raw_parts(pointer, length) };
    log(&format!("[wasm rust] received binary {:?}", slice));
    // Process the slice here...
}

#[wasm_bindgen]
pub fn deserialize_array_buffer(buffer: &[u8]) -> Result<Uint8Array, JsValue> {
    let performance = window()
        .expect("should have a window in this context")
        .performance()
        .expect("performance should be available");
    let mut start_time: f64 = performance.now();

    let mut offset = 0;
    let mut models: Vec<MyModel> = Vec::new();

    while offset < buffer.len() {
        // Read the length of the current Uint8Array (assuming 32-bit unsigned integer)
        let len = u32::from_le_bytes([
            buffer[offset],
            buffer[offset + 1],
            buffer[offset + 2],
            buffer[offset + 3],
        ]) as usize;
        offset += 4;

        // Read the Uint8Array
        let data = &buffer[offset..offset + len];
        let my_model = MyModel::decode(data)
            .map_err(|e| JsValue::from_str(&format!("Failed to decode: {}", e)))?;
        models.push(my_model);

        offset += len;
    }

    log(&format!(
        "[wasm rust] process protobuf: {:?}ms",
        performance.now() - start_time
    ));

    start_time = performance.now();
    // * for each model, use `encode_model_to_flatbuffer` and return a list of encoded buffers
    let mut fb_models: Vec<Vec<u8>> = Vec::new();

    for model in models.iter() {
        let fb: Vec<u8> = encode_model_to_flatbuffer(model);
        fb_models.push(fb);
    }

    // * print Vec<Vec<u8>>
    log(&format!(
        "[wasm rust] fb_models: {:?}ms",
        performance.now() - start_time,
    ));

    let flattened = flatten_vec_vec_u8(fb_models);
    // Convert the Rust Vec<u8> into a Uint8Array
    Ok(Uint8Array::from(&flattened[..]))
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

fn flatten_vec_vec_u8(vecs: Vec<Vec<u8>>) -> Vec<u8> {
    let mut buffer = Vec::new();
    for vec in vecs {
        buffer.extend((vec.len() as u32).to_le_bytes());
        buffer.extend(vec);
    }
    buffer
}
