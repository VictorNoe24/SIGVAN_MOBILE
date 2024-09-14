import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import SearchInputComponent from "../../components/SearchInputComponent";
import CardProductsComponent from "./components/CardProductsComponent";
import {LOGGER} from "../../utils/env";
import {getAllProducts} from "../../db/apis/API_PRODUCTS";
import NoSearchComponent from "../../components/NoSearchComponent";
import {useFocusEffect} from "@react-navigation/native";

const SearchScreen = () => {
    const [products, setProducts] = useState([])
    const [productsState, setProductsState] = useState(true)

    const getAllProduct = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setProductsState(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllProduct()
        }, [])
    );

    useEffect(() => {
        getAllProduct();
    }, []);

    return (
        <View style={styles.container}>
            <SearchInputComponent/>
            <ScrollView
                style={{marginBottom: '20%'}}
                showsVerticalScrollIndicator={false}
            >
                {!productsState && products.map((product, index) => (
                    <View key={index}>
                        <CardProductsComponent
                            image={product?.images[0]}
                            name={product?.name_product}
                            category={product?.name_category}
                            price={product?.sale_price}
                        />
                    </View>
                ))}
            </ScrollView>
            {products.length === 0 && (
                <NoSearchComponent/>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        padding: 17,
    },
})

export default SearchScreen;