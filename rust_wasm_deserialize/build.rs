// build.rs
fn main() {
    prost_build::Config::new()
        .type_attribute(".", "#[derive(serde::Serialize, serde::Deserialize)]")
        .compile_protos(&["src/my_model.proto"], &["src/"])
        .unwrap();
}
