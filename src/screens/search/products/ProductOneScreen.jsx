import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {LOGGER} from "../../../utils/env";
import {getByIdProduct} from "../../../db/apis/API_PRODUCTS";

const ProductOneScreen = ({route}) => {

    const [product, setProduct] = useState([])
    const {id} = route.params;
    const getOneProduct = async () => {
        try {
            const data = await getByIdProduct(id);
            if (data && data.length > 0) {
                setProduct(data);
            }
        } catch (e) {
            LOGGER.error(e);
        }
    }

    useEffect(() => {
        getOneProduct()
    }, []);
    return (
        <View style={styles.container}>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default ProductOneScreen;