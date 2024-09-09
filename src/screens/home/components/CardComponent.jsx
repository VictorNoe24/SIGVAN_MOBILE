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
        <View>
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
        width: 126,
        height: 126,
        marginRight: 15,
    },
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: '#D9D9D9',
    },
    text_container: {
        top: "80%",
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF520D',
    },
});

export default CardComponent;