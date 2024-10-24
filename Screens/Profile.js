import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Profile = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const user = FIREBASE_AUTH.currentUser;
  const name = user.displayName;
  const bloodType = user.bloodType;
  const birthday = user.birthday;
  const emergContact = user.emergContact;
  const allergies = user.allergies;
  const medication = user.medication;

  useEffect(() => {
    // Hovering animation: moves the card up and down repeatedly
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10, // move up by 10 pixels
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // move back to original position
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { transform: [{ translateY }] }]}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{name}'s Medicard</Text>
        </View>
        <View style={styles.info}>
          <Text>Blood Type: O</Text>
          <Text>Birthday: 10/17/2006</Text>
          <Text>Emergency Contact: XXX-XXX-XXXX</Text>
          <Text>Allergies: Peanuts, Pollen, Latex</Text>
          <Text>Medication: Benadryl</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 350,
    height: 600,
    backgroundColor: "lightblue",
    borderRadius: 10,
    elevation: 5, // Shadow effect on Android
    shadowColor: "#000", // Shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontSize: 35,
  },
  info: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
  },
});

export default Profile;
