import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
};

export const addFiles = createAsyncThunk(
  "add/files",
  async ({ name, userId }, thunkAPI) => {
    try {
      const res = await fetch("http://192.168.0.117:3020", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId }),
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (e) {
      console.log(e);
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const getFiles = createAsyncThunk(
  "get/files",
  async ({ userId }, thunkAPI) => {
    try {
      const res = await fetch("http://192.168.0.117:3020/getFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      return json;
    } catch (e) {
      console.log(e);
      thunkAPI.rejectWithValue(e);
    }
  }
);
export const upload = createAsyncThunk(
  "post/upload",
  async ({ file, userId, dirId }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`http://192.168.0.117:3020/upload/${userId}`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      return json;
    } catch (e) {
      console.log(e, "faac");
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFiles.fulfilled, (state, action) => {
        console.log(action.payload.files, 'ooo daaa');
        state.files = action.payload.files;
      })
      .addCase(addFiles.fulfilled, (state, action) => {
        console.log(action.payload, '3');
        console.log(state.files, '3');
        
        state.files.push(action.payload);

        console.log(state.files);
        console.log('4', '4');
      });
  },
});
export default filesSlice.reducer;
