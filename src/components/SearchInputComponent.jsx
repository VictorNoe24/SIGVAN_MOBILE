import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";

const SearchInputComponent = ({fuctions = ()=> {}}) => {
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation();

    const handleFocus = () => {
        setIsFocused(true);
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'none' },
        });
    };

    const handleBlur = () => {
        setIsFocused(false);
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: 'flex' },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Icon
                    name={'search-outline'}
                    size={24}
                    color={'#9CA1A4'}
                />
                <TextInput
                    style={styles.input}
                    placeholder={'Buscar productos'}
                    onChangeText={(value) => fuctions(value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    console.log('Escanear código QR');
                }}
            >
                <Icon
                    name={'qr-code-outline'}
                    size={24}
                    color={'#9CA1A4'}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        height: 49,
        width: '84%',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 15,
        marginBottom: 26,
        borderColor: '#9CA1A4',
        alignItems: 'center',
        gap: 5
    },
    input: {
        height: 44,
        width: '100%',
    },
    button: {
        height: 49,
        width: '14%',
        borderWidth: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#9CA1A4',
    },
});

export default SearchInputComponent;
