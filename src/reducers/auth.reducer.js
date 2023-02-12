import { HANDLE_LOGIN_SUCCESS, HANDLE_SIGNOUT_SUCCESS, HANDLE_UPDATE_SUCCESS } from "~/constants"

const initialState = {
    isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,
    accessToken: JSON.parse(localStorage.getItem('accessToken')) || '',
    refreshToken: JSON.parse(localStorage.getItem('refreshToken')) || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    loginWithGoogle: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_LOGIN_SUCCESS:
            state.isLogin = true
            state.accessToken = action.data.accessToken
            state.refreshToken = action.data.refreshToken
            state.user = action.data.user || action.data
            state.loginWithGoogle = action.loginWithGoogle
            localStorage.setItem('isLogin', JSON.stringify(state.isLogin))
            localStorage.setItem('accessToken', JSON.stringify(state.accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(state.refreshToken))
            localStorage.setItem('user', JSON.stringify(state.user))
            break

        case HANDLE_SIGNOUT_SUCCESS:
            state.isLogin = false
            state.accessToken = ''
            state.refreshToken = ''
            state.user = null
            localStorage.setItem('isLogin', JSON.stringify(false))
            localStorage.setItem('accessToken', JSON.stringify(''))
            localStorage.setItem('refreshToken', JSON.stringify(''))
            localStorage.setItem('user', JSON.stringify(null))
            break

        case HANDLE_UPDATE_SUCCESS:
            state.user = action.data
            localStorage.setItem('user', JSON.stringify(state.user))
            break

        default:
            break
    }

    return { ...state }
}

export default authReducer
