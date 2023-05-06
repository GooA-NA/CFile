import React from 'react';
import styled from "styled-components/native";
import { Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";

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
  border: 1px solid gray;
  box-shadow: 15px 10px 4px black;
  width: 90%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: 20px;
  border-bottom: 1px;
`;
const ViewBtnReg = styled.View`
  background-color: #23e8b3;
  box-shadow: 10px 10px 10px gray;
  margin-top: 30px;
  padding: 5px;
  border-radius: 10px;
`;

const SignUp = () => {

    const [email, onChangeEmail] = React.useState("");
    const [firstName, onChangeFirstName] = React.useState("");
    const [lastName, onChangeLastName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
    <Post>
      <FormReg>
        <TextReg>Регистрация</TextReg>
        <TextInputReg
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
        />
        <TextInputReg
          onChangeText={onChangeFirstName}
          placeholder="Имя"
          value={firstName}
        />
        <TextInputReg
          onChangeText={onChangeLastName}
          placeholder="Фамилия"
          value={lastName}
        />
        <TextInputReg
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          keyboardType="numeric"
        />

        <ViewBtnReg>
          <Button title="Зарегестрироваться" color='white'  />
        </ViewBtnReg>
      </FormReg>

      <StatusBar style="auto" />
    </Post>
    );
};

export default SignUp;