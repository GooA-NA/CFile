import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getFiles } from "../features/filesSlice";
import { View, Text } from "react-native";

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
  justify-content: space-between;;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TextFiles = styled.Text`
  font-size: 20px;
`;

const ViewIcon = styled.View`
  margin: 0px 15px;
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
      <FoldersView>
        {files ? (
          files.map((file, index) => {
            return (
              <ViewIcon key={index} >
                <Ionicons name="folder-outline" size={100} color={"blue"}  />
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
