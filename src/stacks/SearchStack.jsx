import {createStackNavigator} from "@react-navigation/stack";
import ProductOneScreen from "../screens/search/products/ProductOneScreen";

const Stack = createStackNavigator();

const SearchStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="ProductOneScreen"
                component={ProductOneScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default SearchStack;