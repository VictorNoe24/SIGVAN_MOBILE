import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import ButtonFloatComponent from "../../../components/ButtonFloatComponent";
import {getAllCategory} from "../../../db/apis/API_CATEGORY";
import {LOGGER} from "../../../utils/env";
import CardCategoryComponent from "./components/CardCategoryComponent";
import NoSearchComponent from "../../../components/NoSearchComponent";
import {useFocusEffect} from "@react-navigation/native";
import SearchInputComponent from "../../../components/SearchInputComponent";

const CategoryScreen = ({ navigation }) => {

    const [categories, setCategories] = useState([]);
    const [categoriesState, setCategoriesState] = useState(true);

    const getAllCategories = async () => {
        try {
            const data = await getAllCategory();
            setCategories(data);
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setCategoriesState(false)
        }
    };

    useFocusEffect(
        useCallback(() => {
            getAllCategories();
        }, [])
    );

    useEffect(() => {
        getAllCategories();
    }, []);

    return(
        <View style={styles.container}>
            <SearchInputComponent/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {categories.map((category, index) => (
                    <CardCategoryComponent
                        key={category?.id_category}
                        nameCategory={category?.name_category}
                    />
                ))}
            </ScrollView>
            {categories.length === 0 && (
                <NoSearchComponent/>
            )}
            <ButtonFloatComponent
                screen={'AddCategoryForm'}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 17,
    }
});

export default CategoryScreen