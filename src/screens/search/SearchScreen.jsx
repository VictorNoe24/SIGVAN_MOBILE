import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import SearchInputComponent from "./components/SearchInputComponent";
import CardProductsComponent from "./components/CardProductsComponent";
import {LOGGER} from "../../utils/env";
import {getAllProducts} from "../../db/apis/API_PRODUCTS";

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
                        <CardProductsComponent/>
                    </View>
                ))}
            </ScrollView>
            <View style={{height:'100%', width: '100%'}}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/image/not_search.png')}
                />
                <Text style={styles.title}>No se encontro productos</Text>
            </View>

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
    image: {
        flexDirection: 'column',
        width: '40%',
        height: '50%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#FF520D',
    }
})

export default SearchScreen;