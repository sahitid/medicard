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
        <Text style={styles.title}>Sign Up</Text>
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
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Pressable style={styles.signinButton}>
              <Text style={styles.signinText} onPress={createAccount}>
                Sign Up
              </Text>
            </Pressable>

            <Text style={styles.logIn}>Already have an account? Login</Text>
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
  title: {
    marginTop: 90,
    marginBottom: 30,
    fontSize: "40px",
    textAlign: "center",
  },
  email: {
    marginVertical: 50,
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
    color: "fff",
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
  logIn: {
    marginTop: 30,
    color: "#BDBCBC",
    textAlign: "center",
  },
});
