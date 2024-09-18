import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import CardOptionsComponent from "./components/CardOptionsComponent";
import CardProfileComponent from "./components/CardProfileComponent";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import SectionsComponent from "./components/SectionsComponent";
import {useAuth} from "../../context/AuthContext";
import {ToastModal} from "../../utils/Alerts";


const ProfileScreen = () => {

    const {SignOut, userToken} = useAuth();

    async function onFetchUpdateAsync() {
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

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: '#fff', padding: 17}}
        >
            <StatusBar style={'dark-content'} backgroundColor='#fff'/>
            <View style={styles.container}>
                <View style={styles.col}>
                    <CardProfileComponent name={userToken?.name} email={userToken?.email}/>
                    <CardOptionsComponent
                        icon={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                        text={'Buscar Actualización'}

                    />

                    <SectionsComponent title={'Ajustes y preferencias'}/>
                    <CardOptionsComponent
                        icon={<MaterialCommunityIcons name="update" size={24} color="white" />}
                        text={'Notificaciones'}
                        functions={async () => {onFetchUpdateAsync()}}
                    />
                    <CardOptionsComponent
                        icon={<Ionicons name="language" size={24} color="white" />}
                        text={'Idiomas'}
                    />
                    <CardOptionsComponent
                        icon={<Ionicons name="shield" size={24} color="white" />}
                        text={'Seguridad'}
                    />
                    <CardOptionsComponent
                        icon={<Ionicons name="moon" size={24} color="white" />}
                        text={'Modo oscuro'}
                    />

                    <SectionsComponent title={'Soporte'}/>
                    <CardOptionsComponent
                        icon={<Ionicons name="document-text" size={24} color="white" />}
                        text={'Centro de ayuda'}
                    />
                    <CardOptionsComponent
                        icon={<Ionicons name="flag-sharp" size={24} color="white" />}
                        text={'Reportar un bug'}
                    />
                    <CardOptionsComponent
                        icon={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                        text={'Cerrar Sesión'}
                        functions={async () => {SignOut()}}
                    />

                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: "25%",
    },
    col: {
        flexDirection: 'column',
        width: '100%',
    }

});


export default ProfileScreen;