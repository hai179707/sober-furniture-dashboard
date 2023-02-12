import axios from "axios"
import fileDownload from "js-file-download"

export const exportCustomersExcel = (query = '') => {
    axios({
        url: process.env.REACT_APP_BASE_URL + '/customers/export' + query,
        method: 'GET',
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    .then(res => {
        fileDownload(res.data, 'customers.xlsx')
    })
}

export const exportOrdersExcel = (query = '') => {
    axios({
        url: process.env.REACT_APP_BASE_URL + '/orders/export' + query,
        method: 'GET',
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    .then(res => {
        fileDownload(res.data, 'orders.xlsx')
    })
}

export const exportProductsExcel = (query = '') => {
    axios({
        url: process.env.REACT_APP_BASE_URL + '/products/export' + query,
        method: 'GET',
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    .then(res => {
        fileDownload(res.data, 'products.xlsx')
    })
}