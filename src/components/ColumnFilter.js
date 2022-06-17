import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span style={{ fontSize: "20px", lineHeight: "50px", color: "black", marginRight: "15px", }}>
      查詢案號： 
      <TextField
        variant="outlined"
        id="outlined-basic"
        label="輸入案號"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        
      />
    </span>
  );
};

export const DateFilter = ({ column }) => {
  const { filterValue, setFilter, preFilteredRows } = column;
  return (
    <span style={{ fontSize: "20px", lineHeight: "50px", color: "black" }}>
      查詢日期： 
      <TextField
        variant="outlined"
        id="outlined-basic"
        label="輸入日期"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export function ColumnFilterArea({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id].substr(0, 2));
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <span
      style={{
        display: "flex",
        fontSize: "20px",
        lineHeight: "50px",
        color: "black",
        marginRight: "15px",
      }}
    >
      查詢地區：{" "}
      <select
        aria-label="查詢地區"
        style={{
          color: "black",
          width: "150px",
          font: "inherit",
          border: "0.1",
          height: "2em",
          margin: "0",
          display: "block",
          padding: "6px",
          borderRadius: "4px",
          borderColor: "rgb(196, 196, 196)",
          background: "none",
          boxSizing: "content-box",
          letterSpacing: "inherit",
          animationDuration: "10ms",
          borderWidth: "0.5px",
          fontSize: "16px",
        }}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option
          style={{
            color: "black",
          }}
          value=""
        >
          全部地區
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
}

export const NumberRangeColumnFilter = ({ column }) => {
  const { filterValue = [], setFilter, preFilteredRows, id } = column;
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? parseFloat(preFilteredRows[0].values[id])
      : 0;
    let max = preFilteredRows.length
      ? parseFloat(preFilteredRows[0].values[id])
      : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(parseFloat(row.values[id].split(" ")[0]), min);
      max = Math.max(parseFloat(row.values[id].split(" ")[0]), max);
    });
    return [min, max];
  }, [id, preFilteredRows]);
  return (
    <span id="TextFieldBox" style={{ fontSize: "20px", lineHeight: "50px", color: "black" }}>
      查詢底價範圍： 
      <TextField
  
        variant="outlined"
        id="outlined-basic"
        label={`最低 (${min} 萬)`}
        value={filterValue[0] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? parseFloat(val) : undefined, old[1]]);
        }}
      />
      <span  > ～ </span>
      <TextField
       
        variant="outlined"
        id="outlined-basic"
        label={`最高 (${max} 萬)`}
        value={filterValue[1] || ""}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? parseFloat(val) : undefined]);
        }}
      />
    </span>
  );
};

export function ColumnFilterTimes({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <span
      style={{
        display: "flex",
        fontSize: "20px",
        lineHeight: "50px",
        color: "black",
        marginRight: "15px",
        
      }}
    >
      查詢拍次：{" "}
      <select
        style={{
          color: "black",
          width: "150px",
          font: "inherit",
          border: "0.1",
          height: "2em",
          margin: "0",
          display: "block",
          padding: "6px",
          borderRadius: "4px",
          borderColor: "rgb(196, 196, 196)",
          background: "none",
          boxSizing: "content-box",
          letterSpacing: "inherit",
          animationDuration: "10ms",
          borderWidth: "0.5px",
          fontSize: "16px",
        }}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option
          style={{
            color: "black",
          }}
          value=""
        >
          所有拍次
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
}

export function ColumnFilterResult({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <span
      style={{
        display: "flex",
        fontSize: "20px",
        lineHeight: "50px",
        color: "black",
        marginRight: "15px",
      }}
    >
      開標結果：{" "}
      <select
        style={{
          color: "black",
          width: "150px",
          font: "inherit",
          border: "0.1",
          height: "2em",
          margin: "0",
          display: "block",
          padding: "6px",
          borderRadius: "4px",
          borderColor: "rgb(196, 196, 196)",
          background: "none",
          boxSizing: "content-box",
          letterSpacing: "inherit",
          animationDuration: "10ms",
          borderWidth: "0.5px",
          fontSize: "16px",
        }}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option
          style={{
            color: "black",
          }}
          value=""
        >
          所有結果
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
}
 