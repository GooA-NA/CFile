import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

const SafeAVProfile = styled.SafeAreaView`
  background-color: white;
  flex: 1;
  display: flex;
`;
const TextInputReg = styled.Text`
  box-shadow: 15px 10px 4px black;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: 20px;
  border-bottom-width: 1px;
`;
const ViewMenu = styled.SafeAreaView`
  width: 100%;
`;
const ViewProfile = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Profile = () => {
  const token = useSelector((state) => state.usersSlice.token);

  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch()
  // })

  return (
    <SafeAVProfile>
      <ViewMenu>
        <Ionicons name="menu-outline" size={50} />
      </ViewMenu>
      <ViewProfile>
        <Ionicons name="person-circle-outline" size={50} />
        <TextInputReg>{token.firstName}</TextInputReg>
        <TextInputReg>{token.lastName}</TextInputReg>
        <TextInputReg>{token.email}</TextInputReg>
      </ViewProfile>
      <StatusBar style="auto" />
    </SafeAVProfile>
  );
};

export default Profile;
