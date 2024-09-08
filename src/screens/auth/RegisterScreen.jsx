import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import ButtonComponent from "../../components/ButtonComponent";
import InputComponent from "../../components/InputComponent";
import { logger } from "react-native-logs";
import {registerAPI} from "../../db/apis/API_AUTH";

const log = logger.createLogger();

const RegisterScreen = () => {

    const [name, setName] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [phone, setPhone] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [validatePassword, setValidatePassword] = useState(null)
    const [state, setState] = useState(false)

    const insertUser = async () => {
        try {
            setState(true)
            const response = await registerAPI(name, lastname, phone, email, password, 1);
            log.info(response)
        } catch (e) {
            log.error(e);
        } finally {
            setState(false)
        }
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
                />
                <InputComponent
                    titleLeft={'Apellido(s)'}
                    type={'text'}
                    placeholder={'Ingresa tu apellido(s)'}
                    name={lastname}
                    isName={setLastname}
                />
                <InputComponent
                    titleLeft={'Número Telefono'}
                    type={'text'}
                    placeholder={'Ingresa numero telefonico'}
                    name={phone}
                    isName={setPhone}
                />
                <InputComponent
                    titleLeft={'Correo Electronico'}
                    type={'text'}
                    placeholder={'Ingresa correo electronico'}
                    name={email}
                    isName={setEmail}
                />
                <InputComponent
                    titleLeft={'Contraseña'}
                    type={'text'}
                    secure={true}
                    placeholder={' • • • • • • • • • • • • • •'}
                    name={password}
                    isName={setPassword}
                />
                <InputComponent
                    titleLeft={'Confirmar Contraseña'}
                    type={'text'}
                    secure={true}
                    placeholder={' • • • • • • • • • • • • • •'}
                    name={validatePassword}
                    isName={setValidatePassword}
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