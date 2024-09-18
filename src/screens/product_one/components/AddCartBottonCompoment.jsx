import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import SlideButton from "rn-slide-button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {ToastModal} from "../../../utils/Alerts";

const AddCartBottonCompoment = (props) => {

    const [loading, setLoading] = useState(false)

    const addCar = () => {
        setLoading(true);
        ToastModal('Agregado', 'Producto agregado','SUCCESS')
    }

    const loadingIcon = () => {
        if( loading ) {
            return (<ActivityIndicator color={'#fff'} size={24}/>)
        }
        return (<MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />)
    }

    const titleIcon = () => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.buttonTitle}>Agregar al carrito</Text>
                <MaterialCommunityIcons name="shopping-outline" size={24} color="#FF520D"/>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <SlideButton
                title={titleIcon()}
                onReachedToEnd={() => addCar()}
                onReachedToStart={()=> setLoading(false)}
                height={60}
                borderRadius={16}
                padding={0}
                icon={loadingIcon()}
                thumbStyle={styles.thumb}
                containerStyle={styles.buttonContainer}
                underlayStyle={styles.underlay}
                autoReset={true}
                autoResetDelay={1000}
                animation={true}
                animationDuration={300}
                completeThreshold={80}
                disabled={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    buttonTitle: {
        color: '#FF520D',
        fontSize: 18,
        fontWeight: 'bold',
    },
    thumb: {
        backgroundColor: '#FF520D',
        borderRadius: 16,
    },
    buttonContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderColor: '#ededed',
        elevation: 5, // Para sombra en Android
        shadowColor: '#000', // Para sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    underlay: {
        backgroundColor: '#FF520D',
        borderRadius: 16,
    },
})

export default AddCartBottonCompoment;