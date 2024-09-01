import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import NavigationContainer from "./node_modules/@react-navigation/native/lib/module/NavigationContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import List from "./Screens/List";
import Details from "./Screens/Details";
import Dashboard from "./Screens/Dashboard";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_APP } from "./FirebaseConfig";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
    });
  });
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
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    /*
    //COMMENTED OUT FOR LATER USE DONT DELETE YET
    //------------------------//
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {user ? (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: true }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    //----------------------//
    */
  );
}
