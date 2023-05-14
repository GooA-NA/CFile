import React, { useState } from "react";
import { TextInput, Button, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { addFiles } from "../features/filesSlice";
import Ionicons from "@expo/vector-icons/Ionicons";


const ModalScreen = styled.SafeAreaView`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;
const ModalView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextInputModal = styled.TextInput`
  width: 70%;
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const CreateFolderModal = () => {
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setFolderName] = useState("");

  const userId = "645a26440bdb9cf8f26a3374";
  const handleCreateFolder = () => {
    console.log(`Creating folder "${name}"...`);
    console.log('1');
    // отправляйте запрос на создание папки на сервере
    dispatch(addFiles({name, userId}))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  

  return (
    <ModalScreen>
      <Ionicons size={100} color={"#74b1eb"} name="add-circle-outline" onPress={() => setIsModalVisible(true)} />
      <Modal visible={isModalVisible}>
        <ModalView>
          <TextInputModal
            value={name}
            onChangeText={setFolderName}
            placeholder="Enter folder name"
          />
          <Button title="Create" onPress={handleCreateFolder} />
          <Button title="Cancel" onPress={handleCancel} />
        </ModalView>
      </Modal>
      <StatusBar style="auto" />
    </ModalScreen>
  );
};

export default CreateFolderModal;
