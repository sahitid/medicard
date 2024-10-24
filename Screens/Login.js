import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  useFonts,
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrong, setWrong] = useState(false);

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
        <Text style={styles.title}>Login</Text>
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
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Pressable style={styles.signinButton}>
              <Text style={styles.signinText} onPress={signIn}>
                Login
              </Text>
            </Pressable>
            <Text style={styles.forgotText}>Forgot Password?</Text>
            <Text style={styles.signUp}>Don't have an account? Sign Up </Text>
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
    marginVertical: 80,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "top",
  },
  title: {
    marginTop: 30,
    fontSize: "40px",
    textAlign: "center",
    fontFamily: "SpaceGrotesk_300Light",
  },
  email: {
    marginTop: 40,
    marginBottom: 20,
    marginVertical: 4,
    height: 60,
    borderWidth: 0,
    borderRadius: 36,
    padding: 10,
    backgroundColor: "#EEECEC",
  },
  password: {
    marginVertical: 4,
    height: 60,
    borderWidth: 0,
    borderRadius: 36,
    border: "none",
    padding: 10,
    backgroundColor: "#EEECEC",
    marginBottom: 40,
  },
  button: {
    color: "red",
    height: 30,
    backgroundColor: "blue",
  },
  signinButton: {
    marginVertical: 4,
    height: 60,
    borderWidth: 0,
    borderRadius: 36,
    border: "none",
    padding: 10,
    backgroundColor: "#F88976",
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  signinText: {
    fontSize: 20,
    color: "#fff",
  },
  forgotText: {
    color: "#F88976",
    textAlign: "center",
    fontSize: 18,
  },
  signUp: {
    marginTop: 30,
    color: "#BDBCBC",
    textAlign: "center",
  },
});
