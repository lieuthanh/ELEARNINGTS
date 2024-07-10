import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuccess: false,
  isFail: false,
  modalText: "",
  isCreateCourse: false,
  isUpdateCourse: false,
  isDeleteCourse: false,
  isRegisterCourse: false,
  courseId: "",
  isCreateUser: false,
  isUpdateUser: false,
  isDeleteUser: false,
  isRegisterUser: false,
  userId: "",
  userAccessToken: "",
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },

    setIsFail: (state, action) => {
      state.isFail = action.payload;
    },

    setModalText: (state, action) => {
      state.modalText = action.payload;
    },

    setIsCreateCourse: (state, action) => {
      state.isCreateCourse = action.payload;
    },

    setIsUpdateCourse: (state, action) => {
      state.isUpdateCourse = action.payload;
    },

    setIsDeleteCourse: (state, action) => {
      state.isDeleteCourse = action.payload;
    },

    setIsRegisterCourse: (state, action) => {
      state.isRegisterCourse = action.payload;
    },

    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },

    setIsCreateUser: (state, action) => {
      state.isCreateUser = action.payload;
    },

    setIsUpdateUser: (state, action) => {
      state.isUpdateUser = action.payload;
    },

    setIsDeleteUser: (state, action) => {
      state.isDeleteUser = action.payload;
    },

    setIsRegisterUser: (state, action) => {
      state.isRegisterUser = action.payload;
    },

    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setUserAccessToken: (state, action) => {
      state.userAccessToken = action.payload;
    },
  },
});

export const {
  setIsSuccess,
  setIsFail,
  setModalText,
  setIsCreateCourse,
  setIsUpdateCourse,
  setIsDeleteCourse,
  setIsRegisterCourse,
  setCourseId,
  setIsCreateUser,
  setIsUpdateUser,
  setIsDeleteUser,
  setIsRegisterUser,
  setUserId,
  setUserAccessToken,
} = modalSlice.actions;

export default modalSlice.reducer;
