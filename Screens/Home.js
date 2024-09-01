// Home.js
import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import Dashboard from "./Dashboard";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MediCard</Text>
      <Text style={styles.subtitle}>Your Lifeline. Always Within Reach.</Text>
      <Image source={require("../assets/medicine.png")} style={styles.image} />
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate("Dashboard")}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      />
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
});

export default Home;
