import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listingReducer = createSlice({
  name: "clp",
  initialState: {
    loading: false,
    data: [],
    pageNo: 1,
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    data: (state, action) => {
      state.content = action.payload["content-items"].content;
      state.data = action.payload;
    },
    loadMoreData : (state, action) => {
        state.content = [...state.content, ...action.payload["content-items"].content];
        state.data = action.payload;
      },
    updatePageNo: (state, action) => {
    state.pageNo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading, data, loadMoreData, updatePageNo } = listingReducer.actions;

export const loadData =
  (pageNo = 1) =>
  (dispatch) => {
    dispatch(loading(true));
    axios
      .get(`./CONTENTLISTINGPAGE-PAGE${pageNo}.json`)
      .then((res) => {
        dispatch(loading(false));
        if (pageNo > 1) {
            dispatch(loadMoreData(res.data.page));
            dispatch(updatePageNo(pageNo))
        }
        else dispatch(data(res.data.page));
      })
      .catch((err) => {});
  };

export default listingReducer.reducer;
