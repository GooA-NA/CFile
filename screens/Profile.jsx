import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { useDispatch } from 'react-redux';

const SafeAVProfile = styled.SafeAreaView`
    background-color: white;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch()
    })

    return (
        <SafeAVProfile>

        <Ionicons  name="person-circle-outline" size={50} />

        <StatusBar style='auto' />
        </SafeAVProfile>
    );
};

export default Profile;