import React, { useState } from "react";
import styled from "styled-components/native";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { authSignUp } from "../features/usersSlice";
import { Alert } from "react-native";

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

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  function handleEamil(e) {
    setEmail(e.target.value);
  }

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e){
    if(!email || !password || !firstName || !lastName){
      Alert.alert("Неверный формат!", "Заполните все поля")
      return false
    }
    e.preventDefault();
    dispatch(authSignUp({ firstName, lastName, email, password }))
  }

  return (
    <Post>
      <FormReg>
        <TextReg>Регистрация</TextReg>
        <TextInputReg
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
          onChange={handleEamil}
        />
        <TextInput />
        <TextInputReg
          onChangeText={setFirstName}
          placeholder="Имя"
          value={firstName}
          onChange={handleFirstName}
        />
        <TextInputReg
          onChangeText={setLastName}
          placeholder="Фамилия"
          value={lastName}
          onChange={handleLastName}
        />
        <TextInputReg
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          onChange={handlePassword}
        />

        
          <ViewBtnReg onPress={handleSubmit}>
            <Text>Отправить</Text>
          </ViewBtnReg>
        
        {/* <ViewBtnReg>
          <Button title="Зарегестрироваться" color='white' onPress={() => navigation.navigate('Home')}  />
        </ViewBtnReg> */}
        <Button title="Уже есть аккаунт?" color="blue" onPress={() => navigation.navigate('SignIn') } />
      </FormReg>

      <StatusBar style="auto" />
    </Post>
  );
};

export default SignUp;
