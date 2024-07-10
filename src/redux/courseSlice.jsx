import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  courseSearch: [],
  courseDetail: "",
  isBuy: false,
  courseRelate: [],
  courseRefer: [],
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    setCourseList: (state, action) => {
      state.courseList = action.payload;
    },

    setCourseSearch: (state, action) => {
      state.courseSearch = action.payload;
    },

    setCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
    },

    setIsBuy: (state, action) => {
      state.isBuy = action.payload;
    },

    setCourseRelate: (state, action) => {
      state.courseRelate = action.payload;
    },

    setCourseRefer: (state, action) => {
      state.courseRefer = action.payload;
    },
  },
});

export const {
  setCourseList,
  setCourseSearch,
  setCourseDetail,
  setIsBuy,
  setCourseRelate,
  setCourseRefer,
} = courseSlice.actions;

export default courseSlice.reducer;
