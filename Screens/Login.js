import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      //Signs in then navigates to dashboard
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      navigation.navigate("Dashboard");
    } catch (error) {
      //Checks why user cant log in
      if (error.code === "auth/wrong-password") {
        alert("Incorrect Password");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email");
      } else {
        console.log("Error signing in:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // TODO => Maybe remove function and put back in button but that made code run twice
  const signUp = async () => {
    navigation.navigate("Signup");
  };

  // TODO => SHOULD BE REMOVED AS SIGNUP PAGE EXIST
  /*const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Account Created!");
    } catch (error) {
      console.log(error);
      alert("Cannot create an account!");
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.email}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          style={styles.password}
          secureTextEntry={true}
          value={password}
          placeholder="password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button onPress={signIn} title="Login" />
            <Button onPress={signUp} title="Create Account" />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};
//};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "top",
  },
  email: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  password: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    color: "red",
    height: 30,
    backgroundColor: "blue",
  },
});
