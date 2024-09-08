import React from 'react';
import {StyleSheet, View} from "react-native";

const RecoveryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recovery Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})

export default RecoveryScreen;