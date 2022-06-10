import styled from "styled-components";
import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import soezdata from "../data/soezdata.json";
import { STORECOLUMNS } from "./storecolumns";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter"; 
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const FilterContainer = styled.div.attrs({ className: "FilterContainer" })`
  display: flex;
`;

const Styles = styled.div.attrs({ className: "Styles" })`
  @media (max-width: 360px) {
    th:nth-of-type(1),
    th:nth-of-type(4),
    th:nth-of-type(7),
    td:nth-of-type(1),
    td:nth-of-type(4),
    td:nth-of-type(7),
    th:nth-of-type(6),
    td:nth-of-type(6),
    th:nth-of-type(2),
    td:nth-of-type(2) {
      display: none;
      font-size: 10px;
    }
    th:nth-of-type(3),
    td:nth-of-type(3),
    th:nth-of-type(5),
    td:nth-of-type(5) {
      font-size: 20px;
    }
  }

  @media (min-width: 570px) and (max-width: 1200px) {
    th:nth-of-type(4),
    th:nth-of-type(7),
    td:nth-of-type(4),
    td:nth-of-type(7),
    th:nth-of-type(2),
    td:nth-of-type(2) {
      display: none;
    }
    .featuretable {
      font-size: 20px;
    }
  }

  @media (min-width: 360px) and (max-width: 570px) {
    th:nth-of-type(4),
    th:nth-of-type(7),
    td:nth-of-type(4),
    td:nth-of-type(7),
    th:nth-of-type(2),
    td:nth-of-type(2),
    th:nth-of-type(1),
    td:nth-of-type(1) {
      display: none;
    }
    .featuretable {
      font-size: 20px;
    }
  }
`;

export const Features = (props, state) => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>物件查詢</h2>
        </div>
        <div className="row">
          <div className="col-xs-6 col-md-3"></div>
          <BasicTable />
        </div>
      </div>
    </div>
  );
};

export const BasicTable = () => {
  const columns = useMemo(() => STORECOLUMNS, []);
  const data = useMemo(() => soezdata, []);
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    pageOptions,
    setPageSize,
    gotoPage,
    pageCount,
    preGlobalFilteredRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <Styles>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />
      <FilterContainer> 
        {headerGroups.map((headerGroup) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div style={{ marginTop: "10px" }} {...column.getHeaderProps()}>
                <div style={{ marginBottom: "10px" }}>
                  {column.canFilter ? column.render("Filter") : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </FilterContainer>
      <div
        style={{
          textAlign: "right",
          color: "black",
          fontSize: "16px",
          marginRight: "20px",
        }}
      >
        <span style={{ textAlign: "right", color: "black", fontSize: "16px" }}>
          {preGlobalFilteredRows.length} 個 搜尋結果
        </span>
        <div style={{ textAlign: "right", color: "red", fontSize: "16px" }}>
          (點擊欄位可排序)
        </div>
      </div>

      <table id="featuretable" className="featuretable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps()
                  )}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        style: {
                          minWidth: cell.column.minWidth,
                          width: cell.column.width,
                        },
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <br></br>

      <div style={{ height: "0px" }}></div>
      <span style={{ width: "100px", fontSize: "20px" }}>
        <br></br>{" "}
        <strong>
          第 <span style={{ color: "red" }}>{pageIndex + 1} </span>頁 , 共{" "}
          {pageOptions.length} 頁
        </strong>{" "}
      </span>
      <div style={{ height: "10px" }}></div>
      <div>
        <FormControl variant="outlined">
          <Select
            style={{
              height: "45px",
              width: "200px",
              fontSize: "20px",
              lineHeight: "25px",
              textAlign: "center",
            }}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem style={{ fontSize: "20px" }} value={10}>
              顯示 10 個物件
            </MenuItem>
            <MenuItem style={{ fontSize: "20px" }} value={25}>
              顯示 25 個物件
            </MenuItem>
            <MenuItem style={{ fontSize: "20px" }} value={50}>
              顯示 50 個物件
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ height: "20px" }}></div>
      <div>
        <Button
          variant="contained"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"|＜＜"}
        </Button>{" "}
        <span> &nbsp; </span>
        <Button
          variant="contained"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{ width: "100px", fontSize: "20px" }}
        >
          上一頁
        </Button>{" "}
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <Button
          variant="contained"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{ width: "100px", fontSize: "20px" }}
        >
          下一頁
        </Button>{" "}
        <span> &nbsp; </span>
        <Button
          variant="contained"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {"＞＞|"}
        </Button>{" "}
        <div style={{ height: "5px" }}></div>
      </div>
      {/* <pre>
        <code> 
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map(row => row.original)
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </Styles>
  );
};
