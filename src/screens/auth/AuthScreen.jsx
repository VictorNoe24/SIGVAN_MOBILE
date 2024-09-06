import React, {useState, useRef, useEffect} from 'react';
import {Animated, Image, StyleSheet, Text, View} from "react-native";
import InputComponent from "../../components/InputComponent";
import ButtomComponent from "../../components/ButtomComponent";

const AuthScreen = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [buttom, setButtom] = useState()

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const openLogo = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        openLogo();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{opacity: fadeAnim}}
            >
                <Image
                    source={require('../../../assets/icon.png')}
                    style={styles.image}
                />
            </Animated.View>
            <Text style={styles.title}>Bienvenido de nuevo</Text>
            <Text style={styles.subTitle}>Bienvenido de nuevo</Text>
            <InputComponent
                titleLeft={'Correo Electronico'}
                name={email}
                isName={setEmail}
                type={'text'}
            />
            <InputComponent
                titleLeft={'Contraseña'}
                name={password}
                isName={setPassword}
                type={'text'}
            />
            <ButtomComponent
                text={'Iniciar Sesión'}
                state={buttom}
                setState={setButtom}
            />
            <Text style={styles.subTitle}>¿Aun no tienes cuenta? registrate</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 17,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 25,
        alignSelf: 'center',
    },
    subTitle: {
        fontSize: 16,
        alignSelf: 'center',
    }
})

export default AuthScreen;