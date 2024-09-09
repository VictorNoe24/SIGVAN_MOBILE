import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {LOGGER} from "../../../utils/env";

const CardHeaderComponent = ({image = null}) => {
    return (
        <View style={styles.constructor}>
            <TouchableOpacity
                onPress={()=>LOGGER.info('Category')}
                style={styles.card}
            >
                <ImageBackground
                    source={image !== null ? image : require('../../../../assets/image/no_search.png')}
                    style={styles.container}
                    borderRadius={16}
                >
                    <Text>No hay anuncios</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: '#D9D9D9',
    },
    constructor: {
        backgroundColor: '#fff',
        width: '100%',
    },
    card: {
        backgroundColor: '#D9D9D9',
        width: '100%',
        height: 201,
        borderRadius: 16,
        marginRight: 15,
    }
});

export default CardHeaderComponent;