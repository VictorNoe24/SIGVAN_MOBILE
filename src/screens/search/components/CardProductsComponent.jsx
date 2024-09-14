import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const CardProductsComponent = ({image = null, name = 'Name', category = 'Category', price = 0.0}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => {console.log('hola')}}
            >
                <Image
                    source={image !== null ? {uri: image} : require('../../../../assets/image/no_photo.png')}
                    style={styles.image}
                />
                <View style={{gap: 7}}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{category}</Text>
                    <Text style={[styles.subtitle, {color: '#FF520D'}]}>${price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
        backgroundColor: '#fff', // Fondo gris claro para mayor contraste
        width: '100%',
        height: 143,
        borderRadius: 16,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    image: {
        height: '80%',
        width: 120,
        borderRadius: 8,
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default CardProductsComponent;