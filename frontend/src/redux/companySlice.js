import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    singleCompany: null,
    searchCompany: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompany: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});

export const { setSingleCompany, setCompanies, setSearchCompany } =
  companySlice.actions;
export default companySlice.reducer;
