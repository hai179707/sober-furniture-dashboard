import * as httpRequest from '~/utils/httpRequest'

export const getOrdersOfCustomer = async (customerId) => {
    try {
        const res = await httpRequest.get('/customers/' + customerId + '/orders')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (data) => {
    try {
        const res = await httpRequest.post('/orders', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const createOrderOfCustomer = async (data) => {
    try {
        const { customer, ...order } = data
        const res = await httpRequest.post('/customers/' + customer + '/orders', order)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getTotalOrderOfCustomer = async (customerId) => {
    try {
        const res = await httpRequest.get('/customers/' + customerId + '/orders/total')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getOrders = async (query = '') => {
    try {
        const res = await httpRequest.get('/orders' + query)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getOrder = async (orderId) => {
    try {
        const res = await httpRequest.get('/orders/' + orderId)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getTotalOrder = async () => {
    try {
        const res = await httpRequest.get('/orders/total')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getHoursTotal = async (date = '') => {
    try {
        const res = await httpRequest.get('/orders/hours?date=' + date)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getLastWeekTotal = async () => {
    try {
        const res = await httpRequest.get('/orders/week')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder = async (orderId, data) => {
    try {
        const res = await httpRequest.put('/orders/' + orderId, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteOrder = async orderId => {
    try {
        const res = await httpRequest.deleteRequest('/orders/' + orderId)
        return res
    } catch (error) {
        console.log(error)
    }
}

