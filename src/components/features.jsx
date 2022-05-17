import styled from "styled-components";
import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import MOCK_DATA from './MOCK_DATA'
import makeData from './makeData'
import { COLUMNS } from './columns'
import { STORECOLUMNS } from './storecolumns'
import { GlobalFilter } from './GlobalFilter'
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


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

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
    grid-template-columns:1fr 1fr 0.8fr 1fr 0.5 npm install react-table --savefr 1fr 0.8fr 0.5fr ;
    grid-column-gap: 8px;
    grid-row-gap: 1em;
    text-align:center;
`;





export const Features = (props, state) => {
  console.log("Features props", props)
  // console.log("Features state", state)
  // useFirestoreConnect([
  //   { collection: 'soez' }
  // ]);

  // const firebaseData = useSelector((store) => store.firestoreReducer);

  // const [soez, setTodos] = useState([{ taskName: "Loading...", idnn: "initial" }]);
  // console.log("todosbook", todosbook);
  // useEffect(() => {
  //   const collectionRef = collection(db, "85soez");
  //   const q = query(collectionRef, orderBy("timestamp", "desc"));
  //   const unsub = onSnapshot(q, (snapshot) =>
  //     setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   );
  //   return unsub;
  // }, []);





  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          <h2>物件查詢</h2>
        </div>
        <div className='row'>
          {/* <Apptest storepropsdata={props.storepropsdata} /> */}
          <div className='col-xs-6 col-md-3'>

            

            {/* <SearchListContainer  >

              <SearchList  >
                <SearchBox >拍次</SearchBox>
                <SearchBox >投標日</SearchBox>
                <SearchBox >拍賣狀態</SearchBox>
                <SearchBox >法拍屋地址</SearchBox>
                <SearchBox >類型</SearchBox>
                <SearchBox >總坪數</SearchBox>
                <SearchBox >公告底價</SearchBox>
                <SearchBox >單價</SearchBox>

              </SearchList> */}


            {/* </SearchListContainer > */}
          </div>
          <BasicTable storepropsdata={props.storepropsdata} />


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

export const BasicTable = (props) => {


  // useFirestoreConnect([
  //   { collection: 'soez' }
  // ]);
  // const { mapStateToPropssoez } = props
  // console.log("BasicTableprops", props.storepropsdata.mapStateToPropssoez.soez )
  const StoreData = props.storepropsdata.mapStateToPropssoez.soez

  // console.log("BasicTablestate", state)
  // console.log("state", )


  // Use the state and functions returned from useTable to build your UI
  const columns = useMemo(() => STORECOLUMNS, [])
  const data = useMemo(() => StoreData, [])

  //要照這這個參數走
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({

    columns,
    data

  },
    
    useFilters,
    useGlobalFilter,
    useSortBy,)


  const { globalFilter } = state
  return (
    <>
       <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

       <div >(點擊欄位可排序)</div>
      {/* Render the UI for your table */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
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
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
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
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  )
}


// const mapStateToProps = (state) => {
//   console.log("mapStateToProps = (state) ", state)
//   return {
//     mapStateToPropssoez: state.firestoreReducer.ordered
//   }
// }
// export default compose(firestoreConnect(['soez']), connect(mapStateToProps))(BasicTable) 