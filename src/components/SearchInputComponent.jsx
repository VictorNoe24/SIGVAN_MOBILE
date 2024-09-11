import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchInputComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon
                    name={'search-outline'}
                    size={24}
                    color={'#9CA1A4'}
                />
                <TextInput
                    style={styles.input}
                    placeholder={'Buscar productos'}
                    onChangeText={(text) => console.log(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('hola')}}
            >
                <Icon
                    name={'qr-code-outline'}
                    size={24}
                    color={'#9CA1A4'}
                />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        height: 49,
        width: '84%',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 26,
        borderColor: '#9CA1A4',
        alignItems: 'center',
        gap: 5
    },
    input: {
        height: 44,
        width: '100%',
    },
    button: {
        height: 49,
        width: '14%',
        borderWidth: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#9CA1A4',
    },
})

export default SearchInputComponent;