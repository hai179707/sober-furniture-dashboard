import { GET_IMAGES, OPEN_TOAST, SET_IMAGE, SET_IMAGE_LIMIT, SET_IMAGE_PAGE, SET_IMAGE_TOTAL, SET_VIEW_IMAGE_MODAL_SHOW } from '~/constants'
import * as imageServices from '~/services/imageServices'

export const getImages = (page = 1, limit = 20, query = '') => {
    return async dispatch => {
        try {
            const res = await imageServices.getImages(page, limit, query)
            if (res) {
                return dispatch({
                    type: GET_IMAGES,
                    data: res
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const setImage = image => ({
    type: SET_IMAGE,
    image
})

export const deleteImage = imageId => {
    return async dispatch => {
        try {
            await imageServices.deleteImage(imageId)
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete image successfully!',
                    type: 'success'
                }
            })
            const res = await imageServices.getImages(1, 20)
            if (res) {
                return dispatch({
                    type: GET_IMAGES,
                    data: res
                })
            }
        } catch (error) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Delete image fail!',
                    type: 'error'
                }
            })
            console.log(error)
        }
    }
}

export const addImage = data => {
    return async dispatch => {
        if (!data.url) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Image url is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.name) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Image name is require!',
                    type: 'error'
                }
            })
        }
        else if (!data.media) {
            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Image media is require!',
                    type: 'error'
                }
            })
        }
        else {
            try {
                const res = await imageServices.addImage(data)
                if (res) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Add image successfully!',
                            type: 'success'
                        }
                    })
                    dispatch({
                        type: SET_IMAGE,
                        image: res
                    })
                    dispatch({
                        type: SET_VIEW_IMAGE_MODAL_SHOW,
                        isShow: true
                    })
                    const images = await imageServices.getImages(1, 20)
                    if (images) {
                        return dispatch({
                            type: GET_IMAGES,
                            data: images
                        })
                    }
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Add image fail!',
                            type: 'error'
                        }
                    })
                }
            } catch (error) {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Add image fail!',
                        type: 'error'
                    }
                })
                console.log(error)
            }
        }
    }
}

export const setViewImageModalShow = isShow => ({
    type: SET_VIEW_IMAGE_MODAL_SHOW,
    isShow
})

export const setImageTotal = total => ({
    type: SET_IMAGE_TOTAL,
    total
})

export const setImagePage = page => ({
    type: SET_IMAGE_PAGE,
    page
})

export const setImageLimit = limit => ({
    type: SET_IMAGE_LIMIT,
    limit
})