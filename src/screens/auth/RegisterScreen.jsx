import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import {registerAPI} from "../../db/apis/API_AUTH";
import {
    validateEmail,
    validateLastname,
    validateName,
    validatePassword, validatePasswordConfirm,
    validatePhoneNumber
} from "../../utils/validate";
import {ToastModal} from "../../utils/Alerts";
import {LOGGER} from "../../utils/env";
import {useNavigation} from "@react-navigation/native";

const RegisterScreen = () => {

    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [valiPassword, setValiPassword] = useState(null)
    const [state, setState] = useState(false)

    const navigation = useNavigation()

    const insertUser = async () => {
        try {
            setState(true)
            const response = await registerAPI(name, lastname, phone, email, password, 1);
            if (response !== undefined && response != null) {
                ToastModal('Registrado', 'Se a registrado tu usuario','SUCCESS');
                navigation.navigate()
                return
            }
            ToastModal('Alerta', 'No se a podido registrar el usuario','WARNING');
        } catch (e) {
            LOGGER.error(e);
        } finally {
            setState(false)
        }
    }

    const initialInput = (typeVar, functions) => {
        if ( typeVar !== null ) {
            return functions(typeVar)
        }
        return true;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido de nuevo</Text>
                <Text style={styles.subTitle}>Por favor ingresa tus datos para iniciar sesión</Text>
                <InputComponent
                    titleLeft={'Nombre(s)'}
                    type={'text'}
                    placeholder={'Ingresa tu nombre(s)'}
                    name={name}
                    isName={setName}
                    validate={() => initialInput(name, validateName)}
                    errorMessage={'El o los nombres solo deben contener letras.'}
                />
                <InputComponent
                    titleLeft={'Apellido(s)'}
                    type={'text'}
                    placeholder={'Ingresa tu apellido(s)'}
                    name={lastname}
                    isName={setLastname}
                    validate={() => initialInput(lastname, validateLastname)}
                    errorMessage={'El o los apellidos solo deben contener letras.'}
                />
                <InputComponent
                    titleLeft={'Número Telefono'}
                    type={'text'}
                    placeholder={'Ingresa numero telefonico'}
                    name={phone}
                    isName={setPhone}
                    keyboardType={'numeric'}
                    validate={() => initialInput(phone, validatePhoneNumber)}
                    errorMessage={'El número telefónico es incorrecto.'}
                />
                <InputComponent
                    titleLeft={'Correo Electronico'}
                    type={'text'}
                    placeholder={'Ingresa correo electronico'}
                    name={email}
                    isName={setEmail}
                    validate={() => initialInput(email, validateEmail)}
                    errorMessage={'Correo electrónico inválido.'}
                    keyboardType={'email-address'}
                />
                <InputComponent
                    titleLeft={'Contraseña'}
                    type={'text'}
                    secure={true}
                    placeholder={' • • • • • • • • • • • • • •'}
                    name={password}
                    isName={setPassword}
                    validate={() => initialInput(password, validatePassword)}
                    errorMessage={'La contraseña debe tener mayúsculas, minúsculas, números, caracteres especiales y un mínimo de 8 caracteres.'}
                    keyboardType={'password'}
                />
                <InputComponent
                    titleLeft={'Confirmar Contraseña.'}
                    type={'text'}
                    secure={true}
                    placeholder={' • • • • • • • • • • • • • •'}
                    name={valiPassword}
                    isName={setValiPassword}
                    validate={() => {
                        if ( valiPassword !== null ) {
                            return validatePasswordConfirm(password, valiPassword);
                        }
                        return true;
                    }}
                    errorMessage={'La contraseña no coincide.'}
                    keyboardType={'password'}
                />
                <ButtonComponent
                    text={'Siguiente'}
                    disable={state}
                    func={()=>insertUser()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 17,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    subTitle: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 40,
    },
})

export default RegisterScreen;