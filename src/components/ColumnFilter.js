import React, { useState } from 'react'
import styled from "styled-components";
import { Input } from '@mui/material';
import TextField from '@mui/material/TextField';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import '@coreui/coreui/dist/css/coreui.min.css'
// import { CFormSelect } from '@coreui/react';
import Select from 'react-select'
import { margin } from '@mui/system';


export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter, preFilteredRows } = column
    // console.log("column", column)
    return (
        <span style={{ fontSize: "20px", lineHeight: "50px", color: "black" }} >
            查詢案號：{' '}
            <TextField variant="outlined" id="outlined-basic" label="輸入案號"
                // style={{height: "25px"}}
                value={filterValue || ''}
                onChange={e => setFilter(e.target.value)}
            />
        </span>
    )
}

export const DateFilter = ({ column }) => {

    const { filterValue, setFilter, preFilteredRows } = column

    return (
        <span style={{ fontSize: "20px", lineHeight: "50px", color: "black" }} >
            查詢日期：{' '}
            <TextField variant="outlined" id="outlined-basic" label="輸入日期"


                value={filterValue || ''}
                onChange={e => setFilter(e.target.value)}
            />
        </span>
    )
}

export function ColumnFilterArea({

    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id].substr(0, 2))
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <span style={{ display: "flex", fontSize: "20px", lineHeight: "50px", color: "black" }}  >
            查詢地區：{' '}
            <select aria-label="查詢地區"
                style={{
                    color: 'black',
                    width: "150px",
                    font: "inherit",
                    border: "0.1",
                    height: "1.1876em",
                    margin: "0",
                    display: "block",
                    padding: "6px",
                    borderRadius: "4px",
                    borderColor: "rgb(196, 196, 196)",
                    background: "none",
                    boxSizing: "content-box",
                    letterSpacing: "inherit",
                    animationDuration: "10ms",
                    // webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                    borderWidth: "0.5px"
                    // -webkit-tap-highlight-color: "transparent",
                }}
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option style={{
                    color: 'black',
                }} value="">全部地區</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select >
        </span >
    )
}


export const NumberRangeColumnFilter = ({ column }) => {


    const { filterValue = [], setFilter, preFilteredRows, id } = column
    // console.log("NumberRangeColumnFiltercolumn", [preFilteredRows, id])
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? parseFloat(preFilteredRows[0].values[id]) : 0
        let max = preFilteredRows.length ? parseFloat(preFilteredRows[0].values[id]) : 0

        // console.log("letminmax", (min), max)


        preFilteredRows.forEach(row => {
            min = Math.min(parseFloat(row.values[id].split(' ')[0]), min)
            max = Math.max(parseFloat(row.values[id].split(' ')[0]), max)
            // console.log("row.values[id].split(' ')[0]",typeof(parseInt(row.values[id])))


            // console.log("min,max sssssssssss", min,max)
        })
        return [min, max]

    }, [id, preFilteredRows])
    // console.log("NumberRangeColumnFiltercolumn[min, max]" ,[min, max])
    // console.log("column", column)

    return (
        <span style={{ fontSize: "20px", lineHeight: "50px", color: "black" }} >
            查詢底價範圍：{' '}

            <TextField variant="outlined" id="outlined-basic" label={`最低 (${min} 萬)`}
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseFloat(val) : undefined, old[1]])
                }}
            // placeholder={`最低 (${min} 萬)`}

            />
            <span>  ～  </span>
            <TextField variant="outlined" id="outlined-basic" label={`最高 (${max} 萬)`}
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseFloat(val) : undefined])
                }}
            // placeholder={`最高 (${max} 萬)`}

            />

        </span>
    )
}

// export function SliderColumnFilter({
//     column: { filterValue, setFilter, preFilteredRows, id },
// }) {
//     // Calculate the min and max
//     // using the preFilteredRows

//     const [min, max] = React.useMemo(() => {
//         let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//         let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//         preFilteredRows.forEach(row => {
//             min = Math.min(row.values[id], min)
//             max = Math.max(row.values[id], max)
//         })
//         return [min, max]
//     }, [id, preFilteredRows])

//     return (
//         <>
//             <input
//                 type="range"
//                 min={min}
//                 max={max}
//                 value={filterValue || min}
//                 onChange={e => {
//                     setFilter(parseInt(e.target.value, 10))
//                 }}
//             />
//             <button onClick={() => setFilter(undefined)}>Off</button>
//         </>
//     )
// }





export function ColumnFilterTimes({

    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <span style={{ display:"flex",fontSize: "20px", lineHeight: "50px", color: "black" }} >
            查詢拍次：{' '}
            <select

                style={{
                    color: 'black',
                    width: "150px",
                    font: "inherit",
                    border: "0.1",
                    height: "1.1876em",
                    margin: "0",
                    display: "block",
                    padding: "6px",
                    
                    borderRadius: "4px",
                    borderColor: "rgb(196, 196, 196)",
                    background: "none",
                    boxSizing: "content-box",
                    letterSpacing: "inherit",
                    animationDuration: "10ms",
                    // webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                    borderWidth: "0.5px"
                    // -webkit-tap-highlight-color: "transparent",
                }}

                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option style={{
                    color: 'black',
                }} value="">所有拍次</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </span>
    )
}





export function ColumnFilterResult({

    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <span style={{ display:"flex", fontSize: "20px", lineHeight: "50px", color: "black" }} >
            查詢開標結果：{' '}
            <select
                style={{
                    color: 'black',
                    width: "150px",
                    font: "inherit",
                    border: "0.1",
                    height: "1.1876em",
                    margin: "0",
                    display: "block",
                    padding: "6px",
                    borderRadius: "4px",
                    borderColor: "rgb(196, 196, 196)",
                    background: "none",
                    boxSizing: "content-box",
                    letterSpacing: "inherit",
                    animationDuration: "10ms",
                    // webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                    borderWidth: "0.5px"
                    // -webkit-tap-highlight-color: "transparent",
                }}
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined)
                }}
            >
                <option style={{
                    color: 'black',
                }} value="">所有結果</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </span>
    )
}
