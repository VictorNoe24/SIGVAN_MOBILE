import React, {useEffect, useState, useCallback} from 'react';
import {
    ActivityIndicator, Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import CardComponent from "./components/CardComponent";
import CardHeaderComponent from "./components/CardHeaderComponent";
import {getAllCategory} from "../../db/apis/API_CATEGORY";
import {LOGGER} from "../../utils/env";
import {getAllRecentProducts} from "../../db/apis/API_PRODUCTS";
import {useFocusEffect} from "@react-navigation/native";

const HomeScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [categoryState, setCategoryState] = useState(true)
    const [productsState, setProductsState] = useState(true)

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            setCategoryState(true)
            setProductsState(true)

            await getAllCategories();
            await getAllProducts();
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const getAllCategories = async () => {
        try {
            const data = await getAllCategory();
            setCategory(data);
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setCategoryState(false)
        }
    }

    const getAllProducts = async () => {
        try {
            const data = await getAllRecentProducts();
            setProducts(data);
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setProductsState(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getAllCategories();
            getAllProducts();
        }, [])
    );

    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);

    return (
        <ScrollView
            vertical={true}
            showsVerticalScrollIndicator={false}
            style={{width:'100%', backgroundColor:'#fff'}}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <StatusBar style={'dark-content'} backgroundColor='#fff'/>
            <View style={styles.container}>
                <CardHeaderComponent/>

                <Text style={styles.title}>Categorías</Text>
                <View style={styles.row}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {!categoryState && category.map((category, index) => (
                            <View key={index}>
                                <CardComponent id={category?.id_category} title={category?.name_category}/>
                            </View>
                        ))}
                        {categoryState && (
                            <ActivityIndicator />
                        )}
                    </ScrollView>
                    {(category.length === 0 && !categoryState) && (
                        <View style={{alignItems: 'center', width:'100%'}}>
                            <Image
                                source={require('../../../assets/image/no_search.png') }
                                borderRadius={16}
                                style={{height: 120, width: 250}}
                            />
                            <Text style={{fontSize: 16,fontWeight: 'bold'}}>Aun no hay categorias</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.title}>Productos recientes</Text>
                <View style={styles.row}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {!productsState && products.map((product, index) => (
                            <View key={index}>
                                <CardComponent id={product?.id_product} title={product?.name_product}/>
                            </View>
                        ))}
                        {productsState && (
                            <ActivityIndicator />
                        )}
                    </ScrollView>
                    {(products.length === 0 && !productsState)&& (
                        <View style={{alignItems: 'center', width:'100%'}}>
                            <Image
                                source={require('../../../assets/image/no_search.png') }
                                borderRadius={16}
                                style={{height: 120, width: 250}}
                            />
                            <Text style={{fontSize: 16,fontWeight: 'bold'}}>Aun no hay productos</Text>
                        </View>
                    )}
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 17,
        paddingBottom: "25%",
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 27,
        alignSelf: 'flex-start',
    },
    row: {
        flex: 1,
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }
})

export default HomeScreen;