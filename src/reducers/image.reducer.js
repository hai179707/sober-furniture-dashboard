import { GET_IMAGES, SET_IMAGE, SET_IMAGE_LIMIT, SET_IMAGE_PAGE, SET_IMAGE_TOTAL, SET_VIEW_IMAGE_MODAL_SHOW } from "~/constants"

const initialState = {
    images: [],
    image: null,
    viewImageModalShow: false,
    total: 0,
    page: 1,
    limit: 20
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES:
            state.images = action.data.data
            state.total = action.data.total
            break

        case SET_IMAGE:
            state.image = action.image
            break

        case SET_VIEW_IMAGE_MODAL_SHOW:
            state.viewImageModalShow = action.isShow
            break

        case SET_IMAGE_TOTAL:
            state.total = action.total
            break

        case SET_IMAGE_PAGE:
            state.page = action.page
            break

        case SET_IMAGE_LIMIT:
            state.limit = action.limit
            break

        default:
            break
    }

    return { ...state }
}

export default imageReducer
