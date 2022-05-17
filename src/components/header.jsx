import styled from "styled-components";
import { GlobalFilter } from './GlobalFilter'

const InputSearch = styled.input.attrs({ className: 'InputSearch' })`
        width: 100%;
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
        border: none;
        background: #FFFFFF;
 
        font-style: #757575;
`;
const InputSearchBox = styled.div.attrs({ className: 'InputSearchBox' })`
display: flex;
        
`;





export const Header = (props) => {

  
  return (
    <header id='header'>
      <form className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>


              <div className='col-md-8 col-md-offset-2 intro-text'>
                {/* <InputSearchBox >
                  <InputSearch type="text" placeholder="請輸入地址 ( 街道、路段、社區名稱 )"></InputSearch>
                  <button href='#features' className='btn btn-custom btn-lg page-scroll'>查詢</button>
                  <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                </InputSearchBox> */}
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </form>
    </header>
  )
}
