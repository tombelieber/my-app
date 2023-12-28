use prost::Message;
use wasm_bindgen::prelude::*;
use web_sys::window;

// Include the generated module. The module name will be derived from your .proto file.
pub mod my_model {
    include!(concat!(env!("OUT_DIR"), "/mypackage.rs"));
}

// Use the generated types from your .proto file.
use my_model::MyModel;

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
pub fn deserialize_array_buffer(buffer: &[u8]) -> Result<String, JsValue> {
    let performance = window()
        .expect("should have a window in this context")
        .performance()
        .expect("performance should be available");
    let start_time: f64 = performance.now();

    let mut offset = 0;
    let mut models = Vec::new();

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

    // JsValue::from_serde(&models)
    //     .map_err(|e| JsValue::from_str(&format!("Failed to serialize to JSON: {}", e)))
    // * send a "done"
    Ok("done".to_string())
}
