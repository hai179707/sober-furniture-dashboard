import { GET_MARKETING_EMAILS, OPEN_TOAST, SET_MARKETING_EMAIL_LIMIT, SET_MARKETING_EMAIL_PAGE, SET_MARKETING_EMAIL_TOTAL } from '~/constants'
import * as marketingEmailServices from '~/services/marketingEmailServices'

export const getMarketingEmails = (page = 1, limit = 20, query = '') => {
    return async dispatch => {
        try {
            const res = await marketingEmailServices.getMarketingEmails(page, limit, query)
            if (res) {
                return dispatch({
                    type: GET_MARKETING_EMAILS,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteMarketingEmail = emailId => {
    return async dispatch => {
        try {
            await marketingEmailServices.deleteMarketingEmail(emailId)
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete email successfully!',
                    type: 'success'
                }
            })
            const res = await marketingEmailServices.getMarketingEmails(1, 20)
            if (res) {
                return dispatch({
                    type: GET_MARKETING_EMAILS,
                    data: res
                })
            }
        } catch (error) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete email fail!',
                    type: 'error'
                }
            })
            console.log(error)
        }
    }
}

export const addMarketingEmail = data => {
    return async dispatch => {
        try {
            const res = await marketingEmailServices.addMarketingEmail(data)
            if (res) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Add email successfully!',
                        type: 'success'
                    }
                })
                const emails = await marketingEmailServices.getMarketingEmails(1, 20)
                if (emails) {
                    return dispatch({
                        type: GET_MARKETING_EMAILS,
                        data: emails
                    })
                }
            }
            else {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Add email fail!',
                        type: 'error'
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Add email fail!',
                    type: 'error'
                }
            })
            console.log(error)
        }
    }
}

export const setMarketingEmailTotal = total => ({
    type: SET_MARKETING_EMAIL_TOTAL,
    total
})

export const setMarketingEmailPage = page => ({
    type: SET_MARKETING_EMAIL_PAGE,
    page
})

export const setMarketingEmailLimit = limit => ({
    type: SET_MARKETING_EMAIL_LIMIT,
    limit
})