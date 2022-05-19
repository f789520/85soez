import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import styled from "styled-components";




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
 

export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)
    return (

        <span>
      
            <InputSearch
                value={value || ''}
                placeholder="請輸入關鍵字查詢物件..."
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            />
        </span>


    )
}