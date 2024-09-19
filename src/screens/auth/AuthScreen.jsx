import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Animated, Image, StyleSheet, Text, View} from "react-native";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Checkbox from 'expo-checkbox';
import {useAuth} from "../../context/AuthContext";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {validateEmail, validatePassword} from "../../utils/validate";
import {loginAPI} from "../../db/apis/API_AUTH";
import {LOGGER} from "../../utils/env";
import {ToastModal} from "../../utils/Alerts";

const AuthScreen = () => {
    const navigate = useNavigation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isChecked, setChecked] = useState(false);
    const [state, setState] = useState(false)
    const {setUserToken, SignIn, Storage, setUserInfo} = useAuth();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const openLogo = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
    };

    const login = async (email, password) => {
        try {
            setState(true);
            const response = await loginAPI(email, password);
            if (response !== undefined && response !== null) {
                setUserToken(response);
                setUserInfo([])
                return await Storage(response)
            }
            ToastModal('Fallo de login', 'Correo o contraseña incorrecta','DANGER');
        } catch (e) {
            LOGGER.error(e);
            ToastModal('Fallo de login', 'Correo o contraseña incorrecta','DANGER');
        } finally {
            setState(false);
        }
    };

    const initialInput = (typeVar, functions) => {
        if ( typeVar !== null ) {
            return functions(typeVar)
        }
        return true;
    };

    useFocusEffect(
        useCallback(()=>{
            setUserInfo([])
        },[])
    )

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
            <Text style={styles.subTitle}>Por favor ingresa tus datos para iniciar sesión</Text>

            <InputComponent
                titleLeft={'Correo Electrónico'}
                name={email}
                isName={setEmail}
                type={'text'}
                placeholder={'example@example.com'}
                validate={() => initialInput(email, validateEmail)}
                errorMessage={'Correo electrónico inválido.'}
                keyboardType={'email-address'}
            />

            <InputComponent
                titleLeft={'Contraseña'}
                name={password}
                isName={setPassword}
                type={'text'}
                secure={true}
                titleRight={'¿Olvidaste tu contraseña?'}
                placeholder={' • • • • • • • • • • • • • •'}
                validate={() => initialInput(password, validatePassword)}
                errorMessage={'Contraseña invalida.'}
                keyboardType={'password'}
            />

            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#FF520D' : undefined}
                />
                <Text style={styles.paragraph}>Recordarme</Text>
            </View>
            <ButtonComponent
                text={'Iniciar Sesión'}
                disable={state}
                func={()=>login(email, password)}
            />
            <View style={[styles.section, { justifyContent: 'center', marginTop: 22 }]}>
                <Text style={{fontSize: 16, alignSelf: 'center', fontWeight: 'bold'}}>¿Aun no tienes cuenta? </Text>
                <Text
                    style={{fontSize: 16, alignSelf: 'center', fontWeight: 'bold', color: '#FF520D'}}
                    onPress={() => {
                        setEmail(null)
                        setPassword(null)
                        navigate.navigate('SignUp')
                    }}
                >registrate</Text>
            </View>

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
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 40,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 26,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    checkbox: {
        margin: 8,
    },
})

export default AuthScreen;