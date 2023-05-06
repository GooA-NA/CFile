import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

const SafeAVProfile = styled.SafeAreaView`
    background-color: white;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {
    return (
        <SafeAVProfile>

        <Ionicons  name="person-circle-outline" size={"150%"} />

        <StatusBar style='auto' />
        </SafeAVProfile>
    );
};

export default Profile;