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
import { doc, setDoc, collection } from "firebase/firestore";

const Additional = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const [blood, setBlood] = useState("");
  const [birth, setBirth] = useState("");
  const [emerg, setEmerg] = useState("");
  const [allerg, setAllerg] = useState("");
  const [medication, setMedication] = useState("");

  function navDash() {
    navigation.navigate("Dashboard");
  }

  async function saveData() {
    try {
      //Simple User Data most will be undefined if not using oAuth
      const docRef = await setDoc(
        doc(FIREBASE_DB, "users", auth.currentUser.uid),
        {
          BloodType: blood,
          Birthday: birth,
          EmergencyContact: emerg,
          Allergies: allerg,
          Medication: medication,
        },
        { merge: true }
      );
      console.log("Document written with ID ", docRef.id);
    } catch (e) {}
    navigation.navigate("Dashboard");
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Additional Info</Text>
        <TextInput
          style={styles.email}
          value={blood}
          placeholder="Blood Type"
          autoCapitalize="none"
          onChangeText={(text) => setBlood(text)}
        ></TextInput>
        <TextInput
          style={styles.email}
          value={birth}
          placeholder="Birthday"
          autoCapitalize="none"
          onChangeText={(text) => setBirth(text)}
        ></TextInput>
        <TextInput
          style={styles.email}
          value={emerg}
          placeholder="Emergency Contact"
          autoCapitalize="none"
          onChangeText={(text) => setEmerg(text)}
        ></TextInput>
        <TextInput
          style={styles.email}
          value={allerg}
          placeholder="Allergies"
          autoCapitalize="none"
          onChangeText={(text) => setAllerg(text)}
        ></TextInput>
        <TextInput
          style={styles.email}
          value={medication}
          placeholder="Medication"
          autoCapitalize="none"
          onChangeText={(text) => setMedication(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Pressable style={styles.signinButton}>
              <Text style={styles.signinText} onPress={saveData}>
                Save
              </Text>
            </Pressable>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};
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

export default Additional;
