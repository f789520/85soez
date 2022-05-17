import { format } from 'date-fns'

export const STORECOLUMNS = [
      //   thisId 案號
      {
        Header: '案號',
        Footer: '案號',
        accessor: 'thisId'
    },
    // 拍次
    {
        Header: '拍次',
        Footer: '拍次',
        accessor: 'times',
        disableFilters: true,
        sticky: 'left'
    },
    //   # 投標日期
    {
        Header: '投標日期',
        Footer: '投標日期',
        accessor: 'date_th',
        sticky: 'left'
    },

    //   # 開標結果
    {
        Header: '開標結果',
        Footer: '開標結果',
        accessor: 'result_price',
        sticky: 'left'
    },
    //   # 地址
    {
        Header: '地址',
        Footer: '地址',
        accessor: 'address',
    },
  
    //   # 總底價
    {
        Header: '總底價',
        Footer: '總底價',
        accessor: 'house_total_lowprice'
    },
    //   # 地坪
    {
        Header: '地坪',
        Footer: '地坪',
        accessor: 'lend_area'
    },
   
    // ids
    {
        Header: 'ids',
        Footer: 'ids',
        accessor: 'ids'
    },

]

export const GROUPED_COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                Footer: 'First Name',
                accessor: 'first_name'
            },
            {
                Header: 'Last Name',
                Footer: 'Last Name',
                accessor: 'last_name'
            }
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Date of Birth',
                Footer: 'Date of Birth',
                accessor: 'date_of_birth'
            },
            {
                Header: 'Country',
                Footer: 'Country',
                accessor: 'country'
            },
            {
                Header: 'Phone',
                Footer: 'Phone',
                accessor: 'phone'
            }
        ]
    }
]