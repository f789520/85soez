export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='#page-top'>
            85 SOEZ
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='#features' className='page-scroll'  style={{ }}>
                物件查詢
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                關於85soez
              </a>
            </li>
            <li>
              <a href='#services' className='page-scroll'>
                代標服務
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                Gallery?
              </a>
            </li>
            {/* <li>
              <a href='#testimonials' className='page-scroll'>
                客戶回饋?
              </a>
            </li> */}
            <li>
              <a href='#team' className='page-scroll'>
                我們團隊
              </a>
            </li>
            <li>
              <a href='#contact' className='page-scroll'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
