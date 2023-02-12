import { CLOSE_TOAST, DELETE_CONFIRM_MODAL_SHOW, OPEN_TOAST, SET_SIDEBAR_SHOW } from "~/constants"

export const setSidebarShow = isShow => ({
    type: SET_SIDEBAR_SHOW,
    payload: isShow
})

export const openToast = data => ({
    type: OPEN_TOAST,
    data
})

export const closeToast = () => ({
    type: CLOSE_TOAST
})

export const setDeleteConfirmModelShow = isShow => ({
    type: DELETE_CONFIRM_MODAL_SHOW,
    payload: isShow
})
