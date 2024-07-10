import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navigateList: [
    { id: "trang-chu", title: "Trang chủ", href: "/" },
    { id: "khoa-hoc", title: "Khóa học", href: "/khoa-hoc/tat-ca-khoa-hoc" },
    { id: "blog", title: "Blog", href: "/blog" },
    { id: "thong-tin", title: "Thông tin", href: "/thong-tin" },
  ],

  categoryList: [],

  expandNav: false,

  dropdown: false,

  expandSearch: false,

  expandUser: false,

  isSideBarOpen: false,
};

const navigateSlice = createSlice({
  name: "navigateSlice",
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },

    setExpandNav: (state, action) => {
      state.expandNav = action.payload;
    },

    setDropdown: (state, action) => {
      state.dropdown = action.payload;
    },

    setExpandSearch: (state, action) => {
      state.expandSearch = action.payload;
    },

    setExpandUser: (state, action) => {
      state.expandUser = action.payload;
    },

    setIsSideBarOpen: (state, action) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const {
  setCategoryList,
  setExpandNav,
  setDropdown,
  setExpandSearch,
  setExpandUser,
  setIsSideBarOpen,
} = navigateSlice.actions;

export default navigateSlice.reducer;
