import { configureStore } from "@reduxjs/toolkit";

import tableslice from "../Reducer/tableslice";

export const store = configureStore({
  reducer: {
    table: tableslice,
  },
});
