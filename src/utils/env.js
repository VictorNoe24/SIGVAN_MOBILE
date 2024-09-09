import { logger } from "react-native-logs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getIdUser = async () => {
    const jsonValue = await AsyncStorage.getItem('AUTH_USER_TOKEN');
    const data = JSON.parse(jsonValue);
    return data?.id_user;
}

export const LOGGER = logger.createLogger();
export const databaseName = 'test_database_002.db'
export const userId = getIdUser();