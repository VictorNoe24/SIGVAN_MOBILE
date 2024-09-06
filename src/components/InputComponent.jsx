import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const InputComponent = (
    {
        titleLeft = null,
        titleRight = null,
        name,
        isName,
        secure = false,
        placeholder = null
    }) => {

    return (
        <>
            <View style={styles.row}>
                <Text style={styles.text_1}>{titleLeft}</Text>
                {titleRight != null && <Text style={styles.text_2}>{titleRight}</Text>}
            </View>
            <TextInput
                style={styles.input}
                onChangeText={isName}
                value={name}
                secureTextEntry={secure}
                placeholder={placeholder}
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 44,
        width: '100%',
        margin: 12,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
    },
    text_1: {
        fontSize: 14,
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    text_2: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    }
})

export default InputComponent;