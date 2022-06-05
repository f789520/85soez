import { Link } from "react-router-dom";
import {
  ColumnFilterTimes,
  ColumnFilterResult,
  ColumnFilter,
  NumberRangeColumnFilter,
  ColumnFilterArea,
  DateFilter,
} from "./ColumnFilter";

export const STORECOLUMNS = [
  //   thisId 案號
  {
    Header: "案號",
    Footer: "案號",
    accessor: "thisId",
    Filter: ColumnFilter,
    Cell: ({ cell: { value }, row: { original } }) => (
      <Link to={`detail?ids=${original.ids}`}> {value}</Link>
    ),
    // disableFilters:true
  },
  // 拍次
  {
    Header: "拍次",
    Footer: "拍次",
    accessor: "times",
    // disableFilters: true,
    // sticky: 'left',
    Filter: ColumnFilterTimes,
  },
  //   # 投標日期
  {
    Header: "投標日期",
    Footer: "投標日期",
    accessor: "date_th",
    // sticky: 'left',
    Filter: DateFilter,
  },

  //   # 開標結果
  {
    Header: "開標結果",
    Footer: "開標結果",
    accessor: "result_price",
    sticky: "left",
    Filter: ColumnFilterResult,
  },
  //   # 地址
  {
    Header: "地址",
    Footer: "地址",
    accessor: "address",
    maxWidth: 400,
    minWidth: 140,
    width: 60,
    Filter: ColumnFilterArea,
    Cell: ({ cell: { value }, row: { original } }) => (
      <Link to={`detail?ids=${original.ids}`}> {value}</Link>
    ),
  },
  //   # 總底價
  {
    Header: "總底價 (萬)",
    Footer: "總底價",
    accessor: "house_total_lowprice",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  //   # 地坪
  {
    Header: "地坪 (坪)",
    Footer: "地坪",
    accessor: "lend_area",
    disableFilters: true,

    // Cell: ({ cell: { value }, row: { original }   }) => <Link to={`detail/${original.id}`}>{value}{console.log("value",value) }{console.log("original",original.ids)} </Link>
  },
];

export const PROFILE_COLUMNS = [
  //   thisId 案號
  {
    Header: "案號",
    Footer: "案號",
    accessor: "thisId",
    Filter: ColumnFilter,
    Cell: ({ cell: { value }, row: { original } }) => (
      <Link to={`../detail?ids=${original.ids}`}> {value}</Link>
    ),
    // disableFilters:true
  },
  // 拍次
  {
    Header: "拍次",
    Footer: "拍次",
    accessor: "times",
    // disableFilters: true,
    // sticky: 'left',
    Filter: ColumnFilterTimes,
  },
  //   # 投標日期
  {
    Header: "投標日期",
    Footer: "投標日期",
    accessor: "date_th",
    // sticky: 'left',
    Filter: ColumnFilter,
  },
  //   # 開標結果
  {
    Header: "開標結果",
    Footer: "開標結果",
    accessor: "result_price",
    sticky: "left",
    Filter: ColumnFilterResult,
  },
  //   # 地址
  {
    Header: "地址",
    Footer: "地址",
    accessor: "address",
    Filter: ColumnFilterArea,
    Cell: ({ cell: { value }, row: { original } }) => (
      <Link to={`../detail?ids=${original.ids}`}> {value}</Link>
    ),
  },
  //   # 總底價
  {
    Header: "總底價 (萬)",
    Footer: "總底價",
    accessor: "house_total_lowprice",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
  //   # 地坪
  {
    Header: "地坪 (坪)",
    Footer: "地坪",
    accessor: "lend_area",
    disableFilters: true,
    // Cell: ({ cell: { value }, row: { original }   }) => <Link to={`detail/${original.id}`}>{value}{console.log("value",value) }{console.log("original",original.ids)} </Link>
  },
];
