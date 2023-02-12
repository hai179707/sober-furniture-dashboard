import { CLOSE_TOAST, DELETE_CONFIRM_MODAL_SHOW, OPEN_TOAST, SET_SIDEBAR_SHOW } from "~/constants"

const initialState = {
    sidebarShow: true,
    toast: {
        isOpen: false,
        message: '',
        type: 'success',
        duration: 3000
    },
    deleteConfirmModalShow: false
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SIDEBAR_SHOW:
            state.sidebarShow = action.payload
            break

        case OPEN_TOAST:
            state.toast = {
                ...state.toast,
                isOpen: true,
                ...action.data
            }
            break

        case CLOSE_TOAST:
            state.toast.isOpen = false
            break

        case DELETE_CONFIRM_MODAL_SHOW:
            state.deleteConfirmModalShow = action.payload
            break

        default:
            break
    }

    return { ...state }
}

export default mainReducer
