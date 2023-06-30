import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageEditor } from "expo-image-editor";
import IonIcons from "@expo/vector-icons/Ionicons"

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
  height: 70%;
  object-fit: contain;
`;
const ButtonS = styled.TouchableOpacity`
  width: 47%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  margin: 4px;
  margin-top: 10px;
  
`
const ContainerFBtn = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
              <CorpImage source={{ uri: imageUri.uri }} />
              <ContainerFBtn>
              <ButtonS
                style={styles.red}
                onPress={handleDeleteImage}
              >
                <Text style={styles.buttonText}>Удалить</Text>
                <IonIcons name="trash-outline" color={"white"} size={30}></IonIcons>

              </ButtonS>
              <ButtonS
                style={styles.blue}
                onPress={handleDeleteImage}
              >
                <Text style={styles.buttonText}>Сохранить</Text>
                <IonIcons name="save-outline" color={"white"} size={30}></IonIcons>

              </ButtonS>
              <ButtonS
                style={styles.gray}
                onPress={handleDeleteImage}
              >
                <Text style={styles.buttonText}>Поделиться</Text>
                <IonIcons name="share-outline" color={"white"} size={30}></IonIcons>
              </ButtonS>
              </ContainerFBtn>
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
  red: {
    backgroundColor: "red"
  },
  blue: {
    backgroundColor: "blue"
  },
  gray: {
    backgroundColor: "gray"
  },
  buttonText: {
    flex: 1,
    color: "white",
    textAlign: "center",
    fontSize: 22,
  },
});

export default Home;
