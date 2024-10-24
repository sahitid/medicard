import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import NavigationContainer from "./node_modules/@react-navigation/native/lib/module/NavigationContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import List from "./Screens/List";
import Details from "./Screens/Details";
import Dashboard from "./Screens/Dashboard";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_APP } from "./FirebaseConfig";
import { useEffect, useState } from "react";

import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Logout from "./Screens/Logout";
import Profile from "./Screens/Profile";
import Additional from "./Screens/Additional";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

//--------------

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  //Not sure why use effect is needed will check
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });

  //TODO => Should find a way to remove headers and allow design to work
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logout"
          component={Logout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Additional"
          component={Additional}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
