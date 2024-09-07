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
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";

//TODO => Remove navigation? Not sure if its needed?
const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const createAccount = async () => {
    setLoading(true);

    try {
      //Creates an account with just email (Will allow OAuth later)
      //TODO => Add OAuth
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          //Write to DOC when account is created
          writeData(response.user);

          alert("Account Created!");
          navigation.navigate("Dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      //Checks for why email isn't working
      console.log(error.code);
      // Specific checks (change to Switch)
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use");
      } else {
        //Any other reason
        alert("Cannot create an account! Check Error");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  async function writeData(user) {
    try {
      //Simple User Data most will be undefined if not using oAuth
      const docRef = await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        phone: user.phoneNumber,
        photo: user.photoURL,
      });
      console.log("Document written with ID ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.email}
          value={name}
          placeholder="Display Name"
          autoCapitalize="none"
          onChangeText={(text) => setName(text)}
        ></TextInput>
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
            <Button
              style={styles.button}
              onPress={createAccount}
              title="Create Account"
            />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;

//Styles for the components
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
    color: "fff",
    height: 30,
    backgroundColor: "blue",
  },
});
