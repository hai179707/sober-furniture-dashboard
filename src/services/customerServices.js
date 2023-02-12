import * as httpRequest from '~/utils/httpRequest'

export const updateCustomer = async (id, data) => {
    try {
        const res = await httpRequest.put('/customers/' + id, data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getCustomer = async id => {
    try {
        const res = await httpRequest.get('/customers/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getCustomers = async query => {
    try {
        const res = await httpRequest.get('/customers' + query)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteCustomer = async id => {
    try {
        const res = await httpRequest.deleteRequest('/customers/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const createCustomer = async data => {
    try {
        const res = await httpRequest.post('/customers', data)
        return res
    } catch (error) {
        console.log(error)
    }
}