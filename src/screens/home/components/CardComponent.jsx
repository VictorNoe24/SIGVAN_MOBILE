import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LOGGER} from "../../../utils/env";

const CardComponent = (
    {
        id = 0,
        title = 'Title',
        image = null,
    }
) => {
    return (
        <View style={styles.constructor}>
            <TouchableOpacity
                onPress={()=>LOGGER.info(id)}
                style={styles.card}
            >
                <ImageBackground
                    source={image !== null ? image : require('../../../../assets/image/no_photo.png')}
                    style={styles.container}
                    borderRadius={16}
                >
                    <Text style={styles.text_container}>{title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f0f0',
        width: 126,
        height: 126,
        borderRadius: 16,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    constructor: {
        backgroundColor: '#fff',
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
    },
    text_container: {
        top: "80%",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF520D',
    },
});

export default CardComponent;