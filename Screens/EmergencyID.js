import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmergencyID = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency ID Screen</Text>
      {/* Add content related to Emergency ID here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EmergencyID;
