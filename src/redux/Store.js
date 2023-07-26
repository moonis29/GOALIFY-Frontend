import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../redux/features/auth.slice";
import GoalReducer from "../redux/features/goal.slice";

const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    goal: GoalReducer,
  },
});

export default Store;
