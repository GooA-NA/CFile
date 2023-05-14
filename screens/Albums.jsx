import React, { useState } from "react";
import { TextInput, Button, StyleSheet, Modal } from "react-native";
import CreateFolderModal from "../components/CreateFolderModal";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import Album from "../components/Album";
import { View } from "react-native";

const AlbumScreen = styled.SafeAreaView`
  background-color: white;
  display: flex;
  align-items: center;
  flex: 1;
`;

export default function Albums() {
  return (
    <AlbumScreen>
      <Album />
      <View
        style={{
          marginTop: 10,
          position: "absolute",
          top: "80%",
          left: "75%",
        }}
      >
        <CreateFolderModal />
      </View>
      <StatusBar style="auto" />
    </AlbumScreen>
  );
}
