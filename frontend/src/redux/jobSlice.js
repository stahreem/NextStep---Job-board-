import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJob: "",
    allAppliedJob: [],
    searchQuery: "",
    bookmarkedJobs: [],
  },
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJob: (state, action) => {
      state.searchJob = action.payload;
    },
    setAllAppliedJob: (state, action) => {
      state.allAppliedJob = action.payload;
    },
    clearAllAppliedJob: (state) => {
      state.allAppliedJob = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setBookmarkedJobs: (state, action) => {
      state.bookmarkedJobs = action.payload || [];
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJob,
  setAllAppliedJob,
  setSearchQuery,
  clearAllAppliedJob,
  setBookmarkedJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
