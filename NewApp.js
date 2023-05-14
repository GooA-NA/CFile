import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import SignUp from "./components/SignUp";
import Profile from "./screens/Profile";
import Albums from "./screens/Albums";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./components/SignIn";
import { initializeToken } from "./features/usersSlice";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Homes" component={Home} />
      <Tab.Screen name="Albums" component={Albums} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const NewApp = () => {
  const token = useSelector((state) => state.usersSlice.token);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeToken());
  }, []);
  console.log(token, 'token');
  // if (token) {
  //   return (
  //     <NavigationContainer>
  //     <Tab.Navigator>
  //       <Tab.Screen name="Home" component={Home} />
  //       <Tab.Screen name="Albums" component={Albums} />
  //       <Tab.Screen name="Profile" component={Profile} />
  //     </Tab.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NewApp;
