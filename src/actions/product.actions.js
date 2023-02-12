import { ADD_NEW_PRODUCT_IMAGE, ADD_PRODUCT_IMAGE, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS, OPEN_TOAST, REMOVE_NEW_PRODUCT_IMAGE, REMOVE_PRODUCT_IMAGE, RESET_NEW_PRODUCT, SET_NEW_PRODUCT_AMOUNT, SET_NEW_PRODUCT_BUY_PRICE, SET_NEW_PRODUCT_DESCRIPTION, SET_PRODUCT_LIMIT, SET_NEW_PRODUCT_NAME, SET_PRODUCT_PAGE, SET_NEW_PRODUCT_PROMOTION_PRICE, SET_NEW_PRODUCT_QUOTE, SET_PRODUCT_TOTAL, SET_NEW_PRODUCT_TYPE, SET_PRODUCT_NAME, SET_PRODUCT_DESCRIPTION, SET_PRODUCT_QUOTE, SET_PRODUCT_TYPE, SET_PRODUCT_BUY_PRICE, SET_PRODUCT_PROMOTION_PRICE, SET_PRODUCT_AMOUNT } from '~/constants'
import * as productServices from '~/services/productServices'

export const getProducts = (page = 1, limit = 20, query) => {
    return async dispatch => {
        try {
            const res = await productServices.getProducts(page, limit, query)
            if (res) {
                return dispatch({
                    type: GET_PRODUCTS,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const getProduct = productId => {
    return async dispatch => {
        try {
            const res = await productServices.getProduct(productId)
            if (res) {
                return dispatch({
                    type: GET_PRODUCT,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const addProductImage = imageUrl => ({
    type: ADD_PRODUCT_IMAGE,
    imageUrl
})

export const removeProductImage = imageId => ({
    type: REMOVE_PRODUCT_IMAGE,
    imageId
})

export const updateProduct = (productId, data) => {
    return async dispatch => {
        try {
            const res = await productServices.updateProduct(productId, data)
            if (res) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Update product successfully!',
                        type: 'success'
                    }
                })

                return dispatch({
                    type: GET_PRODUCT,
                    data: res
                })
            }
            else {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Update product fail!',
                        type: 'error'
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Update product fail!',
                    type: 'error'
                }
            })
            console.log(error)
        }
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        try {
            const res = await productServices.deleteProduct(productId)
            if (res) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Delete product successfully!',
                        type: 'success'
                    }
                })

                return dispatch({
                    type: DELETE_PRODUCT
                })
            }
            else {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Delete product fail!',
                        type: 'error'
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete product fail!',
                    type: 'error'
                }
            })
            console.log(error)
        }
    }
}

export const addProduct = (data, action) => {
    return async dispatch => {
        if (!data.name) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Product name is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.type) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Product type is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.images.length) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Product images is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.buyPrice) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Product buy price is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.promotionPrice) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Product promotion price is require!',
                    type: 'error'
                }
            })
        }
        else {
            try {
                const res = await productServices.addProduct(data)
                if (res) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Add product successfully!',
                            type: 'success'
                        }
                    })
                    dispatch({
                        type: RESET_NEW_PRODUCT
                    })
                    if(action) action(res._id)
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Add product fail!',
                            type: 'error'
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Add product fail!',
                        type: 'error'
                    }
                })
                console.log(error)
            }
        }
    }
}

export const setNewProductName = value => ({
    type: SET_NEW_PRODUCT_NAME,
    value
})

export const setNewProductDescription = value => ({
    type: SET_NEW_PRODUCT_DESCRIPTION,
    value
})

export const setNewProductQuote = value => ({
    type: SET_NEW_PRODUCT_QUOTE,
    value
})

export const setNewProductType = value => ({
    type: SET_NEW_PRODUCT_TYPE,
    value
})

export const setNewProductBuyPrice = value => ({
    type: SET_NEW_PRODUCT_BUY_PRICE,
    value
})

export const setNewProductPromotionPrice = value => ({
    type: SET_NEW_PRODUCT_PROMOTION_PRICE,
    value
})

export const setNewProductAmount = value => ({
    type: SET_NEW_PRODUCT_AMOUNT,
    value
})

export const setProductName = value => ({
    type: SET_PRODUCT_NAME,
    value
})

export const setProductDescription = value => ({
    type: SET_PRODUCT_DESCRIPTION,
    value
})

export const setProductQuote = value => ({
    type: SET_PRODUCT_QUOTE,
    value
})

export const setProductType = value => ({
    type: SET_PRODUCT_TYPE,
    value
})

export const setProductBuyPrice = value => ({
    type: SET_PRODUCT_BUY_PRICE,
    value
})

export const setProductPromotionPrice = value => ({
    type: SET_PRODUCT_PROMOTION_PRICE,
    value
})

export const setProductAmount = value => ({
    type: SET_PRODUCT_AMOUNT,
    value
})

export const addNewProductImage = imageUrl => ({
    type: ADD_NEW_PRODUCT_IMAGE,
    imageUrl
})

export const removeNewProductImage = imageId => ({
    type: REMOVE_NEW_PRODUCT_IMAGE,
    imageId
})

export const setProductTotal = total => ({
    type: SET_PRODUCT_TOTAL,
    total
})

export const setProductPage = page => ({
    type: SET_PRODUCT_PAGE,
    page
})

export const setProductLimit = limit => ({
    type: SET_PRODUCT_LIMIT,
    limit
})