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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setBookmarkedJobs: (state, action) => {
      state.bookmarkedJobs = action.payload || [];
    },

    //   toggleBookmark: (state, action) => {
    //     const jobId = action.payload;
    //     if (state.bookmarkedJobIds.includes(jobId)) {
    //       state.bookmarkedJobIds = state.bookmarkedJobIds.filter(
    //         (id) => id !== jobId
    //       );
    //     } else {
    //       state.bookmarkedJobIds.push(jobId);
    //     }
    //   },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJob,
  setAllAppliedJob,
  setSearchQuery,
  setBookmarkedJobs,
  // toggleBookmark,
} = jobSlice.actions;

export default jobSlice.reducer;
