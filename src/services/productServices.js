import * as httpRequest from '~/utils/httpRequest'

export const addProduct = async data => {
    try {
        const res = await httpRequest.post('/products', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async (page = 1, limit = 20, query = '') => {
    try {
        const res = await httpRequest.get(`/products?page=${page || 1}&limit=${limit || 20}&name=${query || ''}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getProduct = async productId => {
    try {
        const res = await httpRequest.get('/products/' + productId)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getProductTypes = async () => {
    try {
        const res = await httpRequest.get('/product-types' )
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (productId, data) => {
    try {
        const res = await httpRequest.put('/products/' + productId, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async productId => {
    try {
        const res = await httpRequest.deleteRequest('/products/' + productId)
        return res
    } catch (error) {
        console.log(error)
    }
}