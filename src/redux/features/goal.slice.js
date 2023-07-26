import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../API";

const initialState = {
  goals: [],
  isLoading: false,
};

export const getAllGoals = createAsyncThunk(
  "goals/getAllGoals",
  async (token) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(`${API}/goals/getAllGoals`, headers);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createGoals = createAsyncThunk(
  "goals/createGoals",
  async (goalObjectWithToken, thunkAPI) => {
    const { goalObj, token } = goalObjectWithToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        `${API}/goals/addGoal`,
        goalObj,
        headers
      );
      console.log(response.data);
      if (response.data.status === "Success") {
        thunkAPI.dispatch(getAllGoals(token));
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (GoalObjectWithToken, thunkAPI) => {
    const { goalObj, token } = GoalObjectWithToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `${API}/goals/updateGoal/${goalObj?._id}`,
        goalObj,
        headers
      );
      console.log(response.data);
      if (response.data.status === "Success") {
        thunkAPI.dispatch(getAllGoals(token));
      }
      // return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteGoals = createAsyncThunk(
  "goals/deleteGoals",
  async (GoalIdWithToken) => {
    const { goalID, token } = GoalIdWithToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(goalID);
    try {
      const response = await axios.delete(
        `${API}/goals/deleteGoal/${goalID}`,
        headers
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const goalSlice = createSlice({
  name: "goalSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.goals = payload.data;
      })
      .addCase(createGoals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(deleteGoals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.goals = state.goals.filter((goal) => goal._id !== payload.data);
      })
      .addCase(updateGoal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export default goalSlice.reducer;
