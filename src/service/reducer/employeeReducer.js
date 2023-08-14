import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:8000/";

const initialState = {
  dataUser: [],
  reportUser: [],
};

export const EmployeeReducer = createSlice({
  name: "EmployeeReducer",
  initialState,
  reducers: {
    addDataUser: (state, action) => {
      state.dataUser = action.payload;
    },
    reportUser: (state, action) => {
      state.reportUser = action.payload;
    },
  },
});

export const getAllEmployee = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${baseUrl}admin/allemployee?sort=ASC`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addDataUser(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserData = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}employee/allreport?sort=ASC`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(reportUser(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const { addDataUser, reportUser } = EmployeeReducer.actions;
export default EmployeeReducer.reducer;
