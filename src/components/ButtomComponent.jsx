import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ButtomComponent = ({style, text = "Text Buttom", state, setState}) => {
    return (
        <>
            <TouchableOpacity
                style={{width:'100%'}}
                onPress={() => setState(!state)}
            >
                <View style={styles.button}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#FF520D',
        padding: 10,
        height: 44,
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
})
export default ButtomComponent;