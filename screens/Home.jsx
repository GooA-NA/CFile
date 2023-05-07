import { Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";

const SViewTop = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const ViewTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const ViewHalfTop = styled.View`
  background-color: white;
  width: 50%;
  margin-top: 10px;
  border-radius: 20px;
  padding: 10px;
`;

const TextTop = styled.Text`
  font-size: 20px;
  text-align: center;
`;

const ViewIcon = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BorderDash = styled.View`
  border: 3px solid gray;
  border-style: dashed;
  margin: 10px;
  border-radius: 20px;
  padding: 10px;
  background-color: "#00FF00";
`;

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <SViewTop>
        <ViewIcon>
          {!selectedImage ? (
            <>
              <BorderDash>
                <Ionicons
                  name="camera-outline"
                  size={150}
                  onPress={takePicture}
                />
              </BorderDash>
              <BorderDash>
                <Ionicons
                  name="images-outline"
                  size={150}
                  onPress={pickImage}
                />
              </BorderDash>
            </>
          ) : (
            <>
              <Image
                source={{ uri: selectedImage[0].uri }}
                style={{ width: "100%", height: 400 }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleDeleteImage}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </ViewIcon>
      </SViewTop>

      <StatusBar style="auto" />
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF8C00",
    borderRadius: 10,
    padding: 10,
    width: "30%",
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
});

export default Home;
