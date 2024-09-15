import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import SearchInputComponent from "../../components/SearchInputComponent";
import CardProductsComponent from "./components/CardProductsComponent";
import {LOGGER} from "../../utils/env";
import {getAllProducts} from "../../db/apis/API_PRODUCTS";
import NoSearchComponent from "../../components/NoSearchComponent";
import {useFocusEffect} from "@react-navigation/native";

const SearchScreen = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsState, setProductsState] = useState(true)

    const getAllProduct = async () => {
        try {
            const data = await getAllProducts();
            LOGGER.info(data.length)
            setProducts(data);
            setFilteredProducts(data);
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setProductsState(false)
        }
    }

    const filter = (text) => {
        if (text === '') {
            setFilteredProducts(products);
        } else {
            const filtered = filteredProducts.filter((product) =>
                product.name_product.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllProduct()
        }, [])
    );

    return (
        <View style={styles.container}>
            <SearchInputComponent
                fuctions={filter}/>
            <ScrollView
                style={{marginBottom: '20%'}}
                showsVerticalScrollIndicator={false}
            >
                {!productsState && filteredProducts.map((product, index) => (
                    <View key={index}>
                        <CardProductsComponent
                            id={product?.id_product}
                            image={product?.images[0]}
                            name={product?.name_product}
                            category={product?.name_category}
                            price={product?.sale_price}
                            navigate={'ProductOneScreen'}
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