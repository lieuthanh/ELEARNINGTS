import { createSlice } from "@reduxjs/toolkit";
import { localServ } from "../service/localStorageService";

const initialState = { userInfo: localServ.getUser(), userList: [] };

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setUserInfo, setUserList } = userSlice.actions;

export default userSlice.reducer;
