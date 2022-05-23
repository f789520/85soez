import React, { useState } from 'react'
import styled from "styled-components";
import { useAsyncDebounce } from 'react-table'


export const ColumnFilter = ({ column }) => {



    const { filterValue, setFilter, preFilteredRows } = column
    console.log("column", column)
    return (
        <span>
            查詢:{' '}
            <input
                style={{
                    width: '100px',
                    marginRight: '0.5rem',
                    color: 'black',
                }}
                value={filterValue || ''}
                onChange={e => setFilter(e.target.value)}
            />
        </span>
    )
}

// export const ColumnFilterArea = ({ column }) => {
//     const Areaselect = styled.select.attrs({ className: 'Areaselect' })`

//        color: black;
//     `;



//     const { filterValue, setFilter, preFilteredRows } = column
//     const [value, setValue] = useState(filterValue)


//     console.log("columnpreFilteredRows", preFilteredRows)
//     console.log("columnpreFilteredRows", setFilter)
//     console.log("columnprefilterValue", filterValue)
//     const onChange = useAsyncDebounce(value => {
//         setFilter(value || undefined)
//     }, 500)
//     return (
//         <Areaselect name="地區" id="area-select"
//             onChange={(e) => {
//                 // setValue(e.target.value);
//                 setFilter(e.target.value)
//                 // console.log("filterValue", filterValue)
//                 // console.log("setFilter", setFilter)
//             }}
//         >
//             <option value=""  >-- 選擇地區 --</option>
//             <option value="高雄" >高雄</option>
//             <option value="台南"  >台南</option>
//             <option value="台中" >台中</option>
//             <option value="新竹" >新竹</option>

//         </Areaselect>
//     )
// }



export function ColumnFilterArea ({
    
    column: { filterValue, setFilter, preFilteredRows, id },
}) 
{
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
        <select
            style={{ 
                color: 'black',
                width: "150px"
            }}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option style={{ 
                color: 'black',
            }} value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}


// export const LandNumberRangeColumnFilter = ({ column }) => {


    // const { filterValue = [], setFilter, preFilteredRows, id } = column
    // // console.log("NumberRangeColumnFiltercolumn", [preFilteredRows, id])
    // const [min, max] = React.useMemo(() => {
    //     let min = preFilteredRows.length ? parseFloat(preFilteredRows[0].values[id]) : 0
    //     let max = preFilteredRows.length ? parseFloat(preFilteredRows[0].values[id]) : 0

    //     console.log("LandNumberRangeColumnFilterletminmax", (min), max)


    //     preFilteredRows.forEach(row => {
    //         min = Math.min(parseFloat(row.values[id].split(' ')[0]), min)
    //         max = Math.max(parseFloat(row.values[id].split(' ')[0]), max)
    //         // console.log("row.values[id].split(' ')[0]",typeof(parseInt(row.values[id])))


    //         // console.log("min,max sssssssssss", min,max)
    //     })
    //     return [min, max]

    // }, [id, preFilteredRows])
    // // console.log("NumberRangeColumnFiltercolumn[min, max]" ,[min, max])
    // console.log("LandNumberRangeColumnFilter", [min, max])

    // return (
    //     <div
    //         style={{
    //             display: 'flex',
    //         }}
    //     >
    //         <input
    //             value={filterValue[0] || ''}
    //             type="number"
    //             onChange={e => {
    //                 const val = e.target.value
    //                 setFilter((old = []) => [val ? parseFloat(val) : undefined, old[1]])
    //             }}
    //             placeholder={`Min (${min})`}
    //             style={{
    //                 // minWidth: '100px',
    //                 marginRight: '0.5rem',
    //                 color: 'black',
    //             }}
    //         />
    //         <div></div>

    //         <br></br>
    //         <input
    //             value={filterValue[1] || ''}
    //             type="number"
    //             onChange={e => {
    //                 const val = e.target.value
    //                 setFilter((old = []) => [old[0], val ? parseFloat(val) : undefined])
    //             }}
    //             placeholder={`Max (${max})`}
    //             style={{
    //                 // width: '150px',
    //                 marginLeft: '0.5rem',
    //                 color: 'black',
    //             }}
    //         />
    //     </div>
    // )
// }

export const NumberRangeColumnFilter = ({ column }) => {


    const { filterValue = [], setFilter, preFilteredRows, id } = column
    // console.log("NumberRangeColumnFiltercolumn", [preFilteredRows, id])
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? parseFloat(preFilteredRows[0].values[id]) : 0
        let max = preFilteredRows.length ? parseFloat(preFilteredRows[0].values[id]) : 0

        console.log("letminmax", (min), max)


        preFilteredRows.forEach(row => {
            min = Math.min(parseFloat(row.values[id].split(' ')[0]), min)
            max = Math.max(parseFloat(row.values[id].split(' ')[0]), max)
            // console.log("row.values[id].split(' ')[0]",typeof(parseInt(row.values[id])))


            // console.log("min,max sssssssssss", min,max)
        })
        return [min, max]

    }, [id, preFilteredRows])
    // console.log("NumberRangeColumnFiltercolumn[min, max]" ,[min, max])
    console.log("column", column)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: "column"
            }}
        >
            <input
                value={filterValue[0] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [val ? parseFloat(val) : undefined, old[1]])
                }}
                placeholder={`Min (${min})`}
                style={{
                    // minWidth: '100px',
                    maxWidth: '150px',
                    margin: '0 auto',
                    // marginRight: '0.5rem',
                    color: 'black',
                }}
            />
            至
            <input
                value={filterValue[1] || ''}
                type="number"
                onChange={e => {
                    const val = e.target.value
                    setFilter((old = []) => [old[0], val ? parseFloat(val) : undefined])
                }}
                placeholder={`Max (${max})`}
                style={{
                    maxWidth: '150px',
                    margin: '0 auto',
                    color: 'black',
                }}
            />
        </div>
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





export function ColumnFilterTimes ({
    
    column: { filterValue, setFilter, preFilteredRows, id },
}) 
{
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
        <select
            style={{ 
                color: 'black',
            }}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option style={{ 
                color: 'black',
            }} value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}





export function ColumnFilterResult ({
    
    column: { filterValue, setFilter, preFilteredRows, id },
}) 
{
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
        <select
            style={{ 
                color: 'black',
            }}
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option style={{ 
                color: 'black',
            }} value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
