import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getFiles } from "../features/filesSlice";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Directory from "./Directory";

const AlbumView = styled.SafeAreaView`
  display: flex;
  align-items: center;
  width: 95%;
  height: 100%;
  border-radius: 20px;
`;

const DefultFolderContainer = styled.SafeAreaView`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DefFolder = styled.TouchableOpacity`
  margin: 5px;
  width: 45%;
  height: 100px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Hr = styled.View`
  width: 100%;
  border: 1px solid gray;
  margin: 20px;
`;

const Album = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.usersSlice.token._id);
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getFiles({ userId }));
  }, [files]);
  const files = useSelector((state) => state.filesSlice.files);
  const dir = files.filter((file) => {
    return !file.parent
  })
  console.log("daaaaaataaaaaaa", dir);

  const openHandler = (file) =>{
    setFile(file);
    setIsFile(true)
  }

  return (
    <AlbumView>
      <DefultFolderContainer>
        <DefFolder style={{ backgroundColor: "rgba(255, 0, 0, 0.8)" }}>
          <Ionicons name="medical-outline" size={50}></Ionicons>
          <Text>Медицинские</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(40, 10, 240, 0.5)" }}>
          <Ionicons name="person-outline" size={50}></Ionicons>
          <Text>Удостоверения личности</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(171, 255, 3, 0.8)" }}>
          <Ionicons name="wallet-outline" size={50}></Ionicons>
          <Text>Финансовые</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(255, 167, 3, 0.8)" }}>
          <Ionicons name="library-outline" size={50}></Ionicons>
          <Text>Образование</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(0, 240, 204, 0.8)" }}>
          <Ionicons name="home-outline" size={50}></Ionicons>
          <Text>Недвижимость</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(201, 10, 240, 0.8)" }}>
          <Ionicons name="briefcase-outline" size={50}></Ionicons>
          <Text>Рабочие</Text>
        </DefFolder>
      </DefultFolderContainer>
      <Hr></Hr>
      <ScrollView contentContainerStyle={styles.container}>
        {dir ? (
          dir.map((file, index) => {
            return (
              <TouchableOpacity key={index} style={styles.folderContainer} onPress={() => openHandler(file)} >
                <Ionicons name="folder-outline" size={100} color={"blue"} />
                {file.name.length > 15 ? (
                  <Text>{`${file.name.slice(0, 7)}...${file.name.substring(file.name.length - 2)}`}</Text>
                ) : (
                  <Text>{file.name}</Text>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.noFoldersText}>Нет папок</Text>
        )}
      </ScrollView>
      <Directory isFile={isFile} setIsFile={setIsFile} file={file} />
      <StatusBar style="auto" />
    </AlbumView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: "15%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  folderContainer: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 20,
  },
  folderName: {
    marginTop: 10,
    fontSize: 10,
    color: "blue",
  },
  noFoldersText: {
    fontSize: 18,
    color: "red",
  },
});

export default Album;
