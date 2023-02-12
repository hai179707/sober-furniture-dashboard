import * as httpRequest from '~/utils/httpRequest'

export const getMarketingEmails = async (page = 1, limit = 20, query = '') => {
    try {
        const res = await httpRequest.get(`/marketingEmails?page=${page}&limit=${limit}&query=${query}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteMarketingEmail = async id => {
    try {
        const res = await httpRequest.deleteRequest('/marketingEmails/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addMarketingEmail = async data => {
    try {
        const res = await httpRequest.post('/marketingEmails', data)
        return res
    } catch (error) {
        console.log(error)
    }
}