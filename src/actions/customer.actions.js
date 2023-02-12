import { DELETE_CUSTOMER, GET_CUSTOMER, GET_CUSTOMERS, OPEN_TOAST, RESET_NEW_CUSTOMER, SET_CUSTOMER_ADDRESS, SET_CUSTOMER_CITY, SET_CUSTOMER_DISPLAY_NAME, SET_CUSTOMER_EMAIL, SET_CUSTOMER_FULL_NAME, SET_CUSTOMER_LIMIT, SET_CUSTOMER_PAGE, SET_CUSTOMER_PHONE, SET_CUSTOMER_PHOTO_URL, SET_CUSTOMER_PROVINCE, SET_CUSTOMER_TOTAL, SET_EDIT_CUSTOMER_INFO_MODAL_SHOW } from '~/constants'
import * as customerServices from '~/services/customerServices'

export const updateCustomer = (id, data) => {
    return async dispatch => {
        try {
            const res = await customerServices.updateCustomer(id, data)
            if(res) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Update successfully!',
                        type: 'success'
                    }
                })
                
                return dispatch({
                    type: GET_CUSTOMER,
                    data: res
                })
            }
            else {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Update fail!',
                        type: 'error'
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCustomers = query => {
    return async dispatch => {
        try {
            const res = await customerServices.getCustomers(query)
            if (res) {
                return dispatch({
                    type: GET_CUSTOMERS,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCustomer = customerId => {
    return async dispatch => {
        try {
            const res = await customerServices.getCustomer(customerId)
            if (res) {
                return dispatch({
                    type: GET_CUSTOMER,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCustomer = customerId => {
    return async dispatch => {
        try {
            await customerServices.deleteCustomer(customerId)
            dispatch({
                type: DELETE_CUSTOMER
            })
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete customer successfully!',
                    type: 'success'
                }
            })
            return
        } catch (error) {
            return dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete customer fail!',
                    type: 'error'
                }
            })
        }
    }
}

export const createCustomer = (data, action) => {
    return async dispatch => {
        if (!data.fullName) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Full name is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.phone) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Phone is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.email) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Email is require!',
                    type: 'error'
                }
            })
        }
        else {
            try {
                const res = await customerServices.createCustomer(data)
                if (res) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Create customer successfully!',
                            type: 'success'
                        }
                    })
                    dispatch({
                        type: RESET_NEW_CUSTOMER,
                    })
                    if(action) action(res._id)
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Create customerfail!',
                            type: 'error'
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Create customerfail!',
                        type: 'error'
                    }
                })
                console.log(error)
            }
        }
    }
}

export const setCustomerDisplayName = value => ({
    type: SET_CUSTOMER_DISPLAY_NAME,
    value
})

export const setCustomerPhotoUrl = value => ({
    type: SET_CUSTOMER_PHOTO_URL,
    value
})

export const setCustomerFullName = value => ({
    type: SET_CUSTOMER_FULL_NAME,
    value
})

export const setCustomerPhone = value => ({
    type: SET_CUSTOMER_PHONE,
    value
})

export const setCustomerEmail = value => ({
    type: SET_CUSTOMER_EMAIL,
    value
})

export const setCustomerAddress = value => ({
    type: SET_CUSTOMER_ADDRESS,
    value
})

export const setCustomerCity = value => ({
    type: SET_CUSTOMER_CITY,
    value
})

export const setCustomerProvince = value => ({
    type: SET_CUSTOMER_PROVINCE,
    value
})

export const setCustomerTotal = total => ({
    type: SET_CUSTOMER_TOTAL,
    total
})

export const setCustomerPage = page => ({
    type: SET_CUSTOMER_PAGE,
    page
})

export const setCustomerLimit = limit => ({
    type: SET_CUSTOMER_LIMIT,
    limit
})

export const setEditCustomerInfoModal = isShow => ({
    type: SET_EDIT_CUSTOMER_INFO_MODAL_SHOW,
    isShow
})