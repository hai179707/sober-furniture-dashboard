import { ADD_NEW_ORDER_PRODUCT, SET_PRODUCT_QTY, DELETE_ORDER, GET_ORDER, GET_ORDERS, OPEN_TOAST, REMOVE_NEW_ORDER_PRODUCT, SET_ORDER_LIMIT, SET_ORDER_PAGE, SET_ORDER_TOTAL, SET_NEW_ORDER_NOTE, SET_NEW_ORDER_PAYMENT_STATUS, SET_NEW_ORDER_STATUS, SET_NEW_ORDER_CUSTOMER, RESET_NEW_ORDER, SET_ORDER_SIDEBAR_TOTAL } from "~/constants"
import * as orderServices from '~/services/orderServices'

export const getOrders = query => {
    return async dispatch => {
        try {
            const res = await orderServices.getOrders(query)
            if (res) {
                return dispatch({
                    type: GET_ORDERS,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getOrder = orderId => {
    return async dispatch => {
        try {
            const res = await orderServices.getOrder(orderId)
            if (res) {
                return dispatch({
                    type: GET_ORDER,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateOrder = (orderId, data, action) => {
    return async dispatch => {
        try {
            const res = await orderServices.updateOrder(orderId, data)
            dispatch({
                type: GET_ORDER,
                data: res
            })
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Update order successfully!',
                    type: 'success'
                }
            })
            if (action) action()
            return
        } catch (error) {
            return dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Update order fail!',
                    type: 'error'
                }
            })
        }
    }
}

export const deleteOrder = (orderId, action) => {
    return async dispatch => {
        try {
            const res = await orderServices.deleteOrder(orderId)
            if (res) {
                dispatch({
                    type: DELETE_ORDER
                })
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Delete order successfully!',
                        type: 'success'
                    }
                })
                const { total } = await orderServices.getTotalOrder()
                dispatch({
                    type: SET_ORDER_SIDEBAR_TOTAL,
                    total
                })
                if (action) action()
            } else {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'You can not delete confirmed order!',
                        type: 'info'
                    }
                })
            }
        } catch (error) {
            return dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete order fail!',
                    type: 'error'
                }
            })
        }
    }
}

export const createOrder = (data, action) => {
    return async dispatch => {
        if (!data.customer) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Customer is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.products.length) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Products is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.cost) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Cost is require!',
                    type: 'error'
                }
            })
        }
        else {
            try {
                const res = await orderServices.createOrderOfCustomer(data)
                if (res) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Create order successfully!',
                            type: 'success'
                        }
                    })
                    dispatch({
                        type: RESET_NEW_ORDER,
                    })
                    const { total } = await orderServices.getTotalOrder()
                    dispatch({
                        type: SET_ORDER_SIDEBAR_TOTAL,
                        total
                    })
                    if (action) action(res.orderCode)
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Create order fail!',
                            type: 'error'
                        }
                    })
                }
            } catch (error) {
                return dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Create order fail!',
                        type: 'error'
                    }
                })
            }
        }
    }
}

export const addNewOrderProduct = product => ({
    type: ADD_NEW_ORDER_PRODUCT,
    product
})

export const removeNewOrderProduct = productIndex => ({
    type: REMOVE_NEW_ORDER_PRODUCT,
    productIndex
})

export const setNewOrderProductQty = (productIndex, qty) => ({
    type: SET_PRODUCT_QTY,
    data: {
        productIndex,
        qty
    }
})

export const setNewOrderNote = value => ({
    type: SET_NEW_ORDER_NOTE,
    value
})

export const setNewOrderPaymentStatus = value => ({
    type: SET_NEW_ORDER_PAYMENT_STATUS,
    value
})

export const setNewOrderStatus = value => ({
    type: SET_NEW_ORDER_STATUS,
    value
})

export const setNewOrderCustomer = value => ({
    type: SET_NEW_ORDER_CUSTOMER,
    value
})

export const setOrderTotal = total => ({
    type: SET_ORDER_TOTAL,
    total
})

export const setOrderSidebarTotal = total => ({
    type: SET_ORDER_SIDEBAR_TOTAL,
    total
})

export const setOrderPage = page => ({
    type: SET_ORDER_PAGE,
    page
})

export const setOrderLimit = limit => ({
    type: SET_ORDER_LIMIT,
    limit
})