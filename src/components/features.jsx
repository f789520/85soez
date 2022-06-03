import styled from "styled-components";
import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
// import MOCK_DATA from '..data/MOCK_DATA'
// import makeData from '..data/makeData'
import soezdata from '../data/soezdata.json'
import { COLUMNS } from './columns'
import { STORECOLUMNS } from './storecolumns'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { createStore } from "redux"
// import { ColumnFilter } from './ColumnFilter'
import './table.css'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useFirestoreConnect } from 'react-redux-firebase'
import Filter from "./Filter";
import TaskItem from "./TaskItem";
import { connect } from 'react-redux'
import db from './fire'
import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Checkboxs } from './Checkbox'

const Styles = styled.div`

@media (max-width: 360px) { 
 th:nth-of-type(1),  th:nth-of-type(4),  th:nth-of-type(7),  td:nth-of-type(1), td:nth-of-type(4),  td:nth-of-type(7) ,    th:nth-of-type(6) ,   td:nth-of-type(6),   th:nth-of-type(2), td:nth-of-type(2){
display: none;
font-size: 10px;
}
th:nth-of-type(3), td:nth-of-type(3), th:nth-of-type(5), td:nth-of-type(5){
font-size: 20px;
}
}

@media (min-width: 570px)and (max-width: 1200px) { 
th:nth-of-type(4), th:nth-of-type(7),   td:nth-of-type(4), td:nth-of-type(7) ,  th:nth-of-type(2), td:nth-of-type(2){
display: none;
} 
.featuretable  { 
font-size: 20px;
}
}

@media (min-width: 360px)and (max-width: 570px) { 
th:nth-of-type(4), th:nth-of-type(7),   td:nth-of-type(4), td:nth-of-type(7) ,  th:nth-of-type(2), td:nth-of-type(2), th:nth-of-type(1), td:nth-of-type(1){
display: none;
}
.featuretable {
 font-size: 20px;
 }
}`

const SearchListContainer = styled.div.attrs({ className: 'SearchListContainer' })`
  min-width: 360px;
        /* max-height: 362px; */
        margin: 0 auto;
`;

const SearchBox = styled.div.attrs({ className: 'SearchBox' })`
  display: flex;
    max-width: 1200px;
    padding-left: 10px;
    margin: 0 auto;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 16px;
    color: #666666;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100%;
`;

const SearchList = styled.div.attrs({ className: 'SearchList' })`
   display: grid;
    grid-template-columns:1fr 1fr 0.8fr 1fr  0.5fr ;
    grid-column-gap: 8px;
    grid-row-gap: 1em;
    text-align:center;
`;





export const Features = (props, state) => {
  console.log("Featuresprops", props)
  console.log("Featuresstate", state)






  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          {/* <br /><br /><br /><br /> */}
          <h2>物件查詢</h2>
        </div>
        <div className='row'>
          {/* <Apptest storepropsdata={props.storepropsdata} /> */}
          <div className='col-xs-6 col-md-3'>
          </div>
          {/* <BasicTable storepropsdata={props.storepropsdata} /> */}
          <BasicTable />

        </div>
      </div>
    </div>
  )
}




// function Table({ columns, data }, props) {
//   // Use the state and functions returned from useTable to build your UI
//   console.log("BTableTableTableTableTableasicTableprops", props)
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   },
//     useSortBy

//   )

//   // We don't want to render all 2000 rows for this example, so cap
//   // it at 20 for this use case
//   const firstPageRows = rows.slice(0, 20)


//   // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               // Add the sorting props to control sorting. For this example
//               // we can add them into the header props
//               // <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                 {column.render('Header')}
//                 {/* Add a sort direction indicator */}
//                 <span>
//                   {column.isSorted
//                     ? column.isSortedDesc
//                       ? ' 🔽'
//                       : ' 🔼'
//                     : '(點擊排序)'}
//                 </span>
//               </th>

//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//               })}
//             </tr>
//           )
//         })}
//       </tbody>

//     </table>


//   )
// }

// function Apptest(props) {

//   console.log("Apptestprops", props);
//   const columns = React.useMemo(
//     () =>
//       [
//         {
//           Header: '拍次',
//           accessor: 'times',
//         },
//         {
//           Header: '投標日期',
//           accessor: 'date_th',
//         },



//         {
//           Header: 'Age',
//           accessor: 'age',
//         },
//         {
//           Header: 'Visits',
//           accessor: 'visits',
//         },
//         {
//           Header: 'Status',
//           accessor: 'status',
//         },
//         {
//           Header: 'Profile Progress',
//           accessor: 'progress',
//         },

//       ],
//     []
//   )

//   const data = React.useMemo(() => makeData(20), [])

//   return (
//     <Styles>
//       <Table columns={columns} data={data} storepropsdata={props.storepropsdata} />
//     </Styles>
//   )
// }
// export default Apptest
// ------------------------------------------------------

export const BasicTable = (props ) => {
  console.log('props',props )
  const [selectedRows, setSelectedRows] = useState([]);
  function handleFav(e) {

    // setFav(!fav)
    console.log('1111111111111111111111111111111111111111111111111', e.target.value)

  }




 


  const columns = useMemo(() => STORECOLUMNS, [])
  const data = useMemo(() => soezdata, [])
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,

    }),
    []
  )

  // console.log("BasicTablecolumns", columns)
  // console.log("BasicTablecolumnssoezdata", soezdata)
  // console.log("BasicTablecolumnsprops", props)

  //設定動作，雖然現在是空的
  // const readsoezdata = article => ({ type: 'readsoezdata', payload: article })
  //將描述各個動作對資料的行為
  // const soezReducer = (state = soezdata, action) => {
  //   console.log("soezReducerBasicTablecolumnsstate", state)
  //   switch (action.type) {
  //     case "readsoezdata":
  //       break;
  //     default:
  //       return state
  //   }
  // }

  //建立保管資料的store
  // const store = createStore(soezReducer)
  // console.log("BasicTablecolumnsstore", store)
  //檢查store
  // console.log("BasicTablecolumnsstoregetState", store.getState())
  //測試用加上去的，等等再把它拿掉：
  // window.store = store;
  // window.readsoezdata = readsoezdata;


  // useEffect(() => {
  //   console.log('11111111111111 ',selectedFlatRows)
  //   const selected = selectedFlatRows.map( row  => row.original);
  //   setSelectedRows(selected);
  // }, [selectedFlatRows, setSelectedRows]);
  //要照這這個參數走
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    // rows,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    // preFilteredRows,
    pageOptions,
    setPageSize,
    gotoPage,
    pageCount,
    preGlobalFilteredRows,
    state ,
    selectedFlatRows,
    // state,
    setGlobalFilter
  } = useTable({

    columns,
    data,
    defaultColumn,

    initialState: { pageIndex: 0 }
  },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    //列表新增我的收藏
    // hooks => {
    //   hooks.visibleColumns.push(columns => [
    //     {
    //       id: 'selection',
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <Checkboxs {...getToggleAllRowsSelectedProps()} />
    //       ),
    //       Cell: ({ row }) => <Checkboxs checked="true" onClick={(e) => handleFav} {...row.getToggleRowSelectedProps()} />
    //     },
    //     ...columns
    //   ])
    // }
    )





  const { globalFilter, pageIndex, pageSize } = state
  // console.log("BasicTablecolumnsstate", state)
  return (
    <Styles >
      <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} filter={globalFilter} setFilter={setGlobalFilter} />
      {/* {console.log("123456789", preGlobalFilteredRows)} */}
      <div>
        <span style={{ textAlign: "left", color: "black", fontSize: "16px" }}>{preGlobalFilteredRows.length} 個 搜尋結果</span>
        <div style={{ textAlign: "right", color: "red", fontSize: "16px" }}>(點擊欄位可排序)</div>
      </div>
      {/* Render the UI for your table */}
      <table id="featuretable" className="featuretable" {...getTableProps()} >
        <thead>

          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (

                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  {/* Add a sort direction indicator */}

                  <span>

                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>

                </th>
              ))}
            </tr>
          ))}


          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  {/* Add a sort direction indicator */}
                </th>
              ))}
            </tr>
          ))}


        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
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
      <span style={{ width: "100px", fontSize: "20px" }}>
        到第  {' '}
        <input
          type='number'
          defaultValue={pageIndex + 1}
          onChange={e => {
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(pageNumber)
          }}
          // eslint-disable-next-line no-undef
          style={{ width: '50px', textAlign: "center" }}
        />  頁
      </span>{' '}

      <span style={{ width: "100px", fontSize: "20px" }}>
        <br></br>
        頁數: {' '}
        <strong >
          第 {' '} <span style={{ color: "red" }} >{pageIndex + 1} </span >頁 , 共  {pageOptions.length}  頁
        </strong>{' '}
      </span >
      <div style={{ height: "5px" }} ></div>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'|<<'}
        </button>{' '}
        <span> &nbsp; </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage} style={{ width: "100px", fontSize: "20px" }} >
          上一頁
        </button>{' '}
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} style={{ width: "100px", fontSize: "20px" }}>
          下一頁
        </button>{' '}
        <span> &nbsp; </span>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>|'}
        </button>{' '}

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
  )
}



// const mapStateToProps = (state) => {
//   console.log("mapStateToProps = (state) ", state)
//   return {
//     mapStateToPropssoez: state.firestoreReducer.ordered
//   }
// }
// export default compose(firestoreConnect(['soez']), connect(mapStateToProps))(BasicTable) 