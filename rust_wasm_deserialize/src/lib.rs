mod my_model_fb_toolkit;
mod my_model_generated;
use js_sys::Uint8Array;
use my_model_fb_toolkit::my_model_fb_toolkit::encode_model_to_flatbuffer;
use prost::Message;
use wasm_bindgen::prelude::*;
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

fn protobuf_to_flatbuffer<T: Message + Default>(
    mut buf: &[u8],
    to_flatbuffer: impl Fn(&T) -> Vec<u8>,
) -> Result<Vec<u8>, prost::DecodeError> {
    let decoded_model: T = T::decode(buf).map_err(|e| e)?;
    // Encode to FlatBuffer
    let fb: Vec<u8> = to_flatbuffer(&decoded_model);
    Ok(fb)
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
            let fb: Vec<u8> = protobuf_to_flatbuffer(buf, encode_model_to_flatbuffer)
                .map_err(|e: prost::DecodeError| JsValue::from_str(&e.to_string()))?;
            self.buffers.push(fb);
        }
        Ok(())
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
}

// * slower, 1k=[1.096/1.087]=1.008, 10k=[11902/10917]=1.09, 10% slower
#[wasm_bindgen]
pub fn process_single_protobuf(buffer: &[u8]) -> Result<Vec<u8>, JsValue> {
    let fb: Vec<u8> = protobuf_to_flatbuffer(buffer, encode_model_to_flatbuffer)
        .map_err(|e: prost::DecodeError| JsValue::from_str(&e.to_string()))?;
    Ok(fb)
}

#[wasm_bindgen]
pub fn batch_process_proto_buffers_to_flat_buffers(
    proto_buffers: Vec<Uint8Array>,
) -> Result<Vec<Uint8Array>, JsValue> {
    let mut fbs: Vec<Uint8Array> = Vec::with_capacity(proto_buffers.len());

    for proto_buf in proto_buffers {
        // Prepare a buffer to copy the Uint8Array contents into
        let mut buf = vec![0; proto_buf.length() as usize];
        proto_buf.copy_to(&mut buf);
        let fb: Vec<u8> = protobuf_to_flatbuffer(&*buf, encode_model_to_flatbuffer)
            .map_err(|e: prost::DecodeError| JsValue::from_str(&e.to_string()))?;
        let uint8_array = unsafe { Uint8Array::view(&fb) };
        fbs.push(uint8_array);
    }

    Ok(fbs)
}

// // * 20% slower
// #[wasm_bindgen]
// pub fn process_data_with_mem_passing(
//     combined: &[u8],
//     offsets: &[u32],
// ) -> Result<Vec<Uint8Array>, JsValue> {
//     // Reconstruct the list of arrays based on offsets
//     let mut flat_buffers: Vec<Uint8Array> = Vec::new();
//     for window in offsets.windows(2) {
//         let start = window[0] as usize;
//         let end = window[1] as usize;

//         let array: &[u8] = &combined[start..end];
//         let decoded_model: MyModel = MyModel::decode(array)
//             .map_err(|e: prost::DecodeError| JsValue::from_str(&e.to_string()))?;
//         // Encode to FlatBuffer
//         let fb: Vec<u8> = encode_model_to_flatbuffer(&decoded_model); // Your existing function
//         flat_buffers.push(Uint8Array::from(&fb[..]));
//     }
//     Ok(flat_buffers)
// }
