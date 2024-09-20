import React from 'react';
import {SafeAreaView, StyleSheet, Text} from "react-native";

const SalesScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Sales Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SalesScreen;