pub mod my_model_fb_toolkit {
    use flatbuffers::{FlatBufferBuilder, ForwardsUOffset, WIPOffset};
    pub mod my_model {
        include!(concat!(env!("OUT_DIR"), "/mypackage.rs"));
    }
    use my_model::{CustomMap as CustomMapPb, MyModel as MyModelPb};

    use crate::my_model_generated::mypackage::{
        custom_map_::{
            BEntry, BEntryArgs, DEntry, DEntryArgs, LEntry, LEntryArgs, SEntry, SEntryArgs,
        },
        CustomMap as FbCustomMap, CustomMapArgs as FbCustomMapArgs, MyModel as MyModelFb,
        MyModelArgs as FbMyModelArgs,
    };

    pub fn encode_model_to_flatbuffer(model: &MyModelPb) -> Vec<u8> {
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

        let my_model_offset: WIPOffset<MyModelFb<'_>> = MyModelFb::create(
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
        custom_map: &Option<CustomMapPb>,
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
}
