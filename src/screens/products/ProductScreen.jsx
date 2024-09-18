import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import ButtonFloatComponent from "../../components/ButtonFloatComponent";
import Ionicons from "@expo/vector-icons/Ionicons";
import CardCategoryComponent from "../category/components/CardCategoryComponent";
import NoSearchComponent from "../../components/NoSearchComponent";
import SearchInputComponent from "../../components/SearchInputComponent";
import {useFocusEffect} from "@react-navigation/native";
import {getAllProducts} from "../../db/apis/API_PRODUCTS";
import {LOGGER} from "../../utils/env";

const ProductScreen = () => {

    const [products, setProducts] = useState([]);

    const getAllProduct = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (e) {
            LOGGER.error(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllProduct()
        }, [])
    );

    useEffect(() => {
        getAllProduct()
    }, []);

    return (
        <View style={styles.container}>
            <SearchInputComponent/>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {products.map((product, index) => (
                    <View key={index}>
                        <CardCategoryComponent
                            image={product?.images[0]}
                            idCategory={product?.id_product}
                            nameCategory={product?.name_product}
                        />
                    </View>
                ))}
            </ScrollView>
            {products.length === 0 && (
                <NoSearchComponent/>
            )}
            <ButtonFloatComponent
                screen={'AddProductForm'}
                icon={<Ionicons name="bag-add" size={24} color="white" />}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 17,
    }
});

export default ProductScreen;

