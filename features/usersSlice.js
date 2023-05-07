import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  error: null,
  signingUp: false,
  signingIn: false,
  chas: "csh",
  token: "token",
  name: "name",
};

export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const res = await fetch("http://192.168.1.99:3020/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, password, email }),
      });


      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      console.log('отправка');
      console.log(json);

      return json;
    } catch (error) {
      console.error(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSignIn = createAsyncThunk(
  "auth/signin",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://192.168.1.99:3020/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const token = await res.json();
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      await AsyncStorage.setItem("token", token.token);
      await AsyncStorage.setItem("name", token.name);
      return token;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        console.log('====================================');
        console.log("pending");
        console.log('====================================');
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        console.log('====================================');
        console.log("rejected");
        console.log('====================================');
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        console.log('====================================');
        console.log("fulfilled");
        console.log('====================================');
        state.token = action.payload
        console.log(action.payload);
        state.signingUp = false;
        state.error = null;
      })
      .addCase(authSignIn.pending, (state) => {

        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {

        state.signingIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {

        state.signingIn = false;
        state.error = null;
        state.token = action.payload.token;
        state.name = action.payload.name;
      });
  },
});

export default usersSlice.reducer