import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import TextField from "@mui/material/TextField";

export const GlobalFilter = ({ filter, setFilter, preGlobalFilteredRows }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <span>
      <TextField
        variant="outlined"
        id="outlined-basic"
        label="請輸入關鍵字查詢物件..."
        style={{ width: "50%" }}
        value={value || ""}
        // placeholder=  {`  請輸入關鍵字查詢物件...`}
        onChange={(e) => {
          // if(value!=""){
          setValue(e.target.value);
          onChange(e.target.value);
          // }
        }}
      />
    </span>
  );
};
