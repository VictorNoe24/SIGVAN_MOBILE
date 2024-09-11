import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

const NoSearchComponent = () => {
    return (
        <View style={{height:'100%', width: '100%'}}>
            <Image
                style={styles.image}
                source={require('../../assets/image/not_search.png')}
            />
            <Text style={styles.title}>No se encontro productos</Text>
        </View>
    )
};

const styles = StyleSheet.create({
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
});

export default NoSearchComponent;