// Home.js
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import Dashboard from "./Dashboard";
import { getAuth } from "firebase/auth";

const Home = ({ navigation }) => {
  function login() {
    navigation.navigate("Login");
  }
  function signup() {
    navigation.navigate("Signup");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MediCard</Text>
      <Text style={styles.subtitle}>Your Lifeline. Always Within Reach.</Text>
      <Image source={require("../assets/medicine.png")} style={styles.image} />
      <Pressable style={styles.loginButton} onPress={login}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
      <Pressable style={styles.signupButton} onPress={signup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f16d6d",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  loginButton: {
    marginVertical: 4,
    height: 60,
    width: 306,
    borderWidth: 0,
    borderRadius: 36,
    padding: 10,
    backgroundColor: "#F26F59",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 20,
  },
  signupButton: {
    marginVertical: 4,
    height: 60,
    width: 306,
    borderWidth: 0,
    borderRadius: 36,
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "#F26F59",
    fontSize: 20,
  },
});

export default Home;
