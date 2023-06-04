import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";
import { ImageEditor } from "expo-image-editor";

const SViewTop = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const ViewIcon = styled.View`
  flex: 1;
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
const CorpImage = styled.Image`
  width: 100%;
  height: 80%;
  object-fit: contain;
`

const Home = () => {
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

  const [imageUri, setImageUri] = useState(undefined);
  const [editorVisible, setEditorVisible] = useState(false);

  const selectPhoto = async () => {
    const response = await ImagePicker.requestCameraPermissionsAsync();
    if (response.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.canceled) {
        launchEditor(pickerResult.uri);
      }
    } else {
      Alert.alert(
        "Please enable camera roll permissions for this app in your settings."
      );
    }
  };

  const takePicture = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      launchEditor(pickerResult.uri);
    }
  };

  const launchEditor = (uri) => {
    setImageUri(uri);
    setEditorVisible(true);
  };

  const handleDeleteImage = () => {
    console.log(imageUri);
    setImageUri(null);
  };

  return (
    <>
      <SViewTop>
        <ViewIcon>
          {!imageUri ? (
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
                  onPress={selectPhoto}
                />
              </BorderDash>
            </>
          ) : (
            <>
              <CorpImage
                source={{ uri: imageUri.uri }}
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
      <View>
        <ImageEditor
          visible={editorVisible}
          onCloseEditor={() => setEditorVisible(false)}
          imageUri={imageUri}
          fixedCropAspectRatio={16 / 9}
          lockAspectRatio={false}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            setImageUri(result);
          }}
          mode="full"
        />
      </View>
      <StatusBar style="auto" />
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff0000",
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
