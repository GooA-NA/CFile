import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const initializeToken = createAsyncThunk(
  "auth/initToken",
  async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  }
);

const initialState = {
  error: null,
  signingUp: false,
  signingIn: false,
  chas: "csh",
  token: null,
  // name: AsyncStorage.getItem("name"),
  // token: 'token',
};

export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      console.log('1');
      const res = await fetch("http://192.168.1.99:3020/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, password, email }),
      });
      console.log('2');

      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      console.log("отправка");
      console.log(json);

      // await AsyncStorage.setItem("token", token.token);
      // await AsyncStorage.setItem("name", token.name);

      return json;
    } catch (error) {
      console.error(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSignIn = createAsyncThunk(
  "auth/signin",
  async ({ firstName, password }, thunkAPI) => {
    try {
      const res = await fetch("http://192.168.1.99:3020/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ firstName, password }),
      });
      const token = await res.json();
      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }

      // await AsyncStorage.setItem("token", token);

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
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.token = action.payload;
        console.log(state.token.firstName);
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
      });
  },
});

export default usersSlice.reducer;
