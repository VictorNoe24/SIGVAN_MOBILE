import {createStackNavigator} from "@react-navigation/stack";
import ProductOneScreen from "../screens/product_one/ProductOneScreen";

const Stack = createStackNavigator();

const SearchStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="ProductOneScreen"
                component={ProductOneScreen}
                options={{
                    headerShown: false,
                    headerTitle: 'Hola'
                }}
            />
        </Stack.Navigator>
    )
}

export default SearchStack;