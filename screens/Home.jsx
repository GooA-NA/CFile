import React from "react";
import { Alert, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SViewTop = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const ViewTop = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const ViewHalfTop = styled.View`
  background-color: white;
  width: 50%;
  margin-top: 10px;
  border-radius: 20px;
  padding: 10px;
`;

const TextTop = styled.Text`
  font-size: 20px;
  text-align: center;
`;

const ViewIcon = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BorderDash = styled.View`
  border: 3px solid gray;
  border-style: dashed;
  margin: 10px;
  border-radius: 20px;
  padding:10px;
  background-color:"#00FF00";
`;

const Home = () => {

    function onPressAl(){
        Alert.alert('Пока не работает')
    }

  return (
    <>
      <SViewTop>
        <ViewIcon>
          <BorderDash>
            <Ionicons name="camera-outline" size={"150%"} />
          </BorderDash>
          <BorderDash>
            <Ionicons.Button backgroundColor={"#00FF00"} name="images-outline" size={"150%"} onPress={onPressAl} />
          </BorderDash>
        </ViewIcon>
        {/* <ViewIcon>
          <BorderDash>
            <Entypo name="archive" size={"200%"} color="gray" />
          </BorderDash>

          <BorderDash>
            <AntDesign name="camerao" size={"200%"} color="gray" />
          </BorderDash>
        </ViewIcon> */}
      </SViewTop>

      <StatusBar style="auto" />
    </>
  );
};

export default Home;
