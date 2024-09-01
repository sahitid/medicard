import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Dashboard = ({ navigation, user }) => {
  //const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const features = [
    { id: "1", name: "Emergency ID", color: "#FEEAEA" },
    { id: "2", name: "First Aid Guide", color: "#E2F1FF" },
    { id: "3", name: "Add Family Members", color: "#FFF5E3" },
    { id: "4", name: "Medication Reminders", color: "#E4F7E1" },
    { id: "5", name: "AR Integration", color: "#E2EAF7" },
    { id: "6", name: "Geo-fenced Alerts", color: "#F5EAF4" },
    { id: "7", name: "Medical Record Sync", color: "#E1F5E4" },
    { id: "8", name: "Symptom Checker", color: "#F5EFEA" },
    { id: "9", name: "Accessibility Options", color: "#F0EAF5" },
    { id: "10", name: "Supply Tracker", color: "#FFF0EA" },
  ];

  const handleCardPress = (item) => {
    if (item.name === "Emergency ID") {
      navigation.navigate("EmergencyID");
    } else {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };
  const auth = getAuth();
  const user = auth.currentUser;
  const displayName = user.email;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {displayName}!</Text>
        <Image
          source={{ uri: "https://path/to/profile/pic.png" }} // Firebase integration needed for profile pic and name
          style={styles.profilePic}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for health info"
        />
      </View>

      {/* Features Grid */}
      <ScrollView contentContainerStyle={styles.featuresContainer}>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            onPress={() => handleCardPress(feature)}
            style={[styles.featureItem, { backgroundColor: feature.color }]}
          >
            <Text style={styles.featureText}>{feature.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              <Text style={styles.modalDescription}>
                {/* Add detailed description for each feature here */}
                Details about {selectedItem.name} functionality.
              </Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "48%",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Dashboard;
