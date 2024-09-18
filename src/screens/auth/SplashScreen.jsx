import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import * as Updates from 'expo-updates';
import {ToastModal} from "../../utils/Alerts";

const SplashScreen = () => {

    async function checkForUpdates() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) {
            ToastModal('Error de actualizacion', `Error fetching latest Expo update: ${error}`,'DANGER');
        }
    }

    useEffect(() => {
        checkForUpdates();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require('../../../assets/icon.png')}
                style={styles.image}
            />
            <Text style={styles.title}>VentasUX</Text>
            <ActivityIndicator
                size="large"
                color="#FF520D"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25,
    },
})

export default SplashScreen