import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from 'expo-image-picker';
import {ToastModal} from "../utils/Alerts";

const InputImageComponent = (
    {
        image = null,
        setImage = null,
    }
) => {

    const pickImage = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            return ToastModal('Permiso denegado', 'Se necesita acceso a la biblioteca de imágenes', 'DANGER');
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setImage(pickerResult.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={ image != null ? {uri: image} : require('../../assets/icon.png')}
            />
            <TouchableOpacity
                style={styles.icon}
                onPress={()=> pickImage()}
            >
                <MaterialIcons name="mode-edit" size={24} color="#FF520D" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        flex: 1,
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#adadad',
        backgroundColor: '#fff',
    },
    icon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#adadad',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 100
    }
})

export default InputImageComponent