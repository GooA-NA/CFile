import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { authSignIn, authSignUp } from "../features/usersSlice";

const Post = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormReg = styled.SafeAreaView`
  width: 80%;
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
`;
const TextReg = styled.Text`
  font-size: 30px;
  color: #727272;
  margin: 10px auto;
`;
const TextInputReg = styled.TextInput`
  box-shadow: 15px 10px 4px black;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: 20px;
  border-bottom-width: 1px;
`;
const ViewBtnReg = styled.TouchableOpacity`
  background-color: #23e8b3;
  box-shadow: 10px 10px 10px gray;
  margin-top: 30px;
  padding: 10px;
  width: 40%;
  align-items: center;
  border-radius: 10px;
  margin: 30px;
`;

const SignIn = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(authSignIn({ firstName, password }));
  }

  return (
    <Post>
      <FormReg>
        <TextReg>Авторизация</TextReg>

        <TextInputReg
          onChangeText={setFirstName}
          placeholder="Имя"
          value={firstName}
          onChange={handleFirstName}
        />

        <TextInputReg
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          onChange={handlePassword}
        />

        <ViewBtnReg>
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Отправить</Text>
          </TouchableOpacity>
        </ViewBtnReg>
        {/* <ViewBtnReg>
          <Button
            title="Зарегестрироваться"
            color="white"
            onPress={() => navigation.navigate("Home")}
          />
        </ViewBtnReg> */}
        <Button
          title="Нет аккаунта?"
          color="blue"
          onPress={() => navigation.navigate("SignUp")}
        />
      </FormReg>

      <StatusBar style="auto" />
    </Post>
  );
};

export default SignIn;
