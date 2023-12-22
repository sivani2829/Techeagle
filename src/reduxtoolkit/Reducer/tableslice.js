import { createSlice } from "@reduxjs/toolkit";
let initialState = [
  { name: "UsainBolt", speed: 40, startTime: "6.00", endTime: "-" },
  { name: "PT Usha", speed: 60, startTime: "6.00", endTime: "-" },
  { name: "Bill Gates", speed: 20, startTime: "6.00", endTime: "-" },
];

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tableData: initialState,
  },
  reducers: {
    addUser: (state, action) => {
      console.log("action", action);
      if (action.payload.name && action.payload.speed) {
        state.tableData = [...state.tableData, { ...action.payload }];
      }
    },
  },
});

export const { addUser } = tableSlice.actions;
export default tableSlice.reducer;
