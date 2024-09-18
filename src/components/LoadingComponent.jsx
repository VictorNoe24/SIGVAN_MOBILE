import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const LoadingComponent = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#FF520D" />
            <Text style={styles.loadingText}>Cargando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: '#FF520D',
    }
});

export default LoadingComponent;
