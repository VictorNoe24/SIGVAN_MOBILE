import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {LOGGER} from "../../utils/env";
import {getByIdProduct} from "../../db/apis/API_PRODUCTS";
import LoadingComponent from "../../components/LoadingComponent";
import CarouselCompoment from "./components/CarouselCompoment";
import AddCartBottonCompoment from "./components/AddCartBottonCompoment";
import TitleProductComponent from "./components/TitleProductComponent";
import HeaderComponent from "./components/HeaderComponent";



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

    if (!product || !product[0]) {
        return <LoadingComponent/>
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Image style={styles.image} borderBottomLeftRadius={24} borderBottomRightRadius={24} source={{uri: product[0].images[0]}}/>
                <CarouselCompoment product={product}/>
                <View style={{padding: 17}}>
                    <TitleProductComponent
                        title={product[0].name_product}
                        category={product[0].name_category}
                        sale_price={product[0].sale_price.toFixed(2)}
                        purchase_price={product[0].purchase_price.toFixed(2)}
                        stock={product[0].stock}
                        description={product[0].description}
                        discount={product[0].discount}
                    />
                </View>
            </ScrollView>
            <HeaderComponent/>
            <AddCartBottonCompoment/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    image:{
        height: 400,
        width: "100%",
    },
})

export default ProductOneScreen;