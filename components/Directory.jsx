import React, { useEffect } from "react";
import { Button, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../features/filesSlice";

const BackBtn = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FilesContainer = styled.SafeAreaView`
  display: flex;
  flex:1;
  flex-direction: row;
  width: 100%;

`;
const IconContainer = styled.SafeAreaView`
    margin: 10px;
`;
const ModalView = styled.SafeAreaView`
  flex: 1;
`;

const Directory = ({ isFile, setIsFile, file }) => {
  const files = useSelector((state) => state.filesSlice.files);
  const userId = useSelector((state) => state.usersSlice.token._id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles({ userId }));
  }, [files]);
  const childs = files.filter(function (files) {
    return file?._id == files.parent;
  });

  return (
    <Modal visible={isFile}>
      <ModalView>
        <BackBtn onPress={() => setIsFile(false)}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color={"blue"}
          ></Ionicons>
          <Text style={{ color: "blue", fontSize: 20 }}>Назад</Text>
        </BackBtn>
        <FilesContainer>
          {childs ? (
            childs.map((child, index) => {
              return (
                <IconContainer>
                  <Ionicons name="document-outline" size={110}></Ionicons>
                  <Text>{`${child.name.slice(0, 7)}...${child.name.substring(
                    child.name.length - 2
                  )}`}</Text>
                </IconContainer>
              );
            })
          ) : (
            <TextContainer>
              <Text style={{ fontSize: 22 }}>Нет файлов</Text>
            </TextContainer>
          )}
        </FilesContainer>
      </ModalView>
    </Modal>
  );
};

export default Directory;
