import * as httpRequest from '~/utils/httpRequest'

export const getImages = async (page = 1, limit = 20, query = '') => {
    try {
        const res = await httpRequest.get(`/images?page=${page}&limit=${limit}&query=${query}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = async id => {
    try {
        const res = await httpRequest.deleteRequest('/images/' + id)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addImage = async data => {
    try {
        const res = await httpRequest.post('/images', data)
        return res
    } catch (error) {
        console.log(error)
    }
}