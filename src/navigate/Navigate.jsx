import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthStacks from "../stacks/Auth";

const Navigation = () => {
    return (
        <NavigationContainer>
            <AuthStacks/>
        </NavigationContainer>
    )
}

export default Navigation;