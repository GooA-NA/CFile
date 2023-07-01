import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getFiles } from "../features/filesSlice";
import { View, Text, ScrollView } from "react-native";

const AlbumView = styled.SafeAreaView`
  display: flex;
  align-items: center;
  width: 95%;
  height: 100%;
  border-radius: 20px;
`;
const FoldersView = styled.SafeAreaView`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TextFiles = styled.Text`
  font-size: 20px;
`;

const ViewIcon = styled.View`
  width: 25%;
  margin: 0px 15px;
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

  const token = useSelector((state) => state.usersSlice.token);

  const userId = token._id;

  useEffect(() => {
    dispatch(getFiles({ userId }));
  }, []);
  const files = useSelector((state) => state.filesSlice.files);
  console.log("daaaaaataaaaaaa", files);

  return (
    <AlbumView>
      <ScrollView></ScrollView>
      <DefultFolderContainer>
        <DefFolder style={{ backgroundColor: "rgba(255, 0, 0, 0.8)", }}>
          <Ionicons name="medical-outline" size={50}></Ionicons>
          <Text >Медицинские</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(40, 10, 240, 0.5)" }}>
          <Ionicons name="person-outline" size={50}></Ionicons>
          <Text >Удостоверения личности</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(171, 255, 3, 0.8)" }}>
          <Ionicons name="wallet-outline" size={50}></Ionicons>
          <Text >Финансовые</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(255, 167, 3, 0.8)" }}>
          <Ionicons name="library-outline" size={50}></Ionicons>
          <Text >Образование</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(0, 240, 204, 0.8)" }}>
          <Ionicons name="home-outline" size={50}></Ionicons>
          <Text >Недвижимость</Text>
        </DefFolder>
        <DefFolder style={{ backgroundColor: "rgba(201, 10, 240, 0.8)" }}>
          <Ionicons name="briefcase-outline" size={50}></Ionicons>
          <Text >Рабочие</Text>
        </DefFolder>
      </DefultFolderContainer>
      <Hr></Hr>
      <FoldersView>
        {files ? (
          files.map((file, index) => {
            return (
              <ViewIcon key={index}>
                <Ionicons name="folder-outline" size={100} color={"blue"} />
                <TextFiles> {file.name} </TextFiles>
              </ViewIcon>
            );
          })
        ) : (
          <Text>Нет папок</Text>
        )}
      </FoldersView>
      <StatusBar style="auto" />
    </AlbumView>
  );
};

export default Album;
