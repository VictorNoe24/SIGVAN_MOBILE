import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';

const CardCategoryComponent = (
    {
        idCategory= 0,
        nameCategory = 'name',
    }
) => {
    return (
        <View key={idCategory} style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../../../../assets/image/no_photo.png')}
            />
            <Text style={styles.name}>{nameCategory}</Text>
            <View style={styles.options}>
                <Fontisto  name="more-v-a" size={24} color="black" />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        borderRadius: 16,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderColor: '#bdbdbd',
        borderWidth: 1,
        shadowColor:  'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
        borderCurve: 'continuous',
        alignSelf: 'center',
        gap: 10,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    image: {
        height: 100,
        width: "20%",
        alignSelf: 'center',
    },
    options: {

    }
})

export default CardCategoryComponent