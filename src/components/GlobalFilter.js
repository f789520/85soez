import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import styled from "styled-components";


const FilterButton = styled.button.attrs({ className: 'FilterButton' })`
     
       
`;

const Areaselect = styled.select.attrs({ className: 'Areaselect' })`
     
       
`;

const InputSearch = styled.input.attrs({ className: 'InputSearch' })`
        width: 50%;
        /* font-family: 'Noto Sans TC'; */
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 13px;
        color: #757575;
        height: 56px;
        padding-left: 15px;
        border-radius: 5px 0px 0px 5px;
        /* filter: drop-shadow(0px 0px 20px #AABBCC); */
        display: flex;
        border:;
        background: #FFFFFF;

        font-style: #757575;
        margin:  auto;
        margin-bottom: 10px ;
`;


export const GlobalFilter = ({ filter, setFilter,preGlobalFilteredRows }) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    // const [valuetest, setValuetest] = useState(filter)
    // const onChangetest = useAsyncDebounce(valuetest => {
    //     setFilter(valuetest || undefined)
    // }, 1000)


    return (

        <span>
            {/* <FilterButton
                value={'高雄'}

                onClick={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            > 高雄 </FilterButton> */}
{/* 
            <Areaselect  name="地區" id="area-select"    
                    onChange={e => {
                    setValue("");
                    onChange(e.target.value);
                }}>
                <option value="">-- 選擇地區 --</option>
                <option value="高雄">高雄</option>
                <option value="台南">台南</option>
                <option value="台中">台中</option>
                <option value="新竹">新竹</option>
              
            </Areaselect> */}

            <InputSearch
                value={value || ''}
                placeholder=  {`  請輸入關鍵字查詢物件...`}
                onChange={e => {
                    // if(value!=""){

                        setValue(e.target.value);
                        onChange(e.target.value);
                        
                    // }
                  
                }}
            />
        </span>


    )
}