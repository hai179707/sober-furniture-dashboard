import { HANDLE_LOGIN_SUCCESS, HANDLE_SIGNOUT_SUCCESS, OPEN_TOAST } from "~/constants"
import * as userServices from '~/services/userServices'

export const handleLogin = (data, action) => {
    return async dispatch => {
        try {
            const res = await userServices.login(data)
            if (res) {
                if(res.user.isAdmin) {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'Login successfully!',
                            type: 'success'
                        }
                    })

                    if(action) action()
    
                    return dispatch({
                        type: HANDLE_LOGIN_SUCCESS,
                        data: res
                    })
                }
                else {
                    dispatch({
                        type: OPEN_TOAST,
                        data: {
                            message: 'You have not permission!',
                            type: 'error'
                        }
                    })
                }
            }
            else {
                dispatch({
                    type: OPEN_TOAST,
                    data: {
                        message: 'Login fail!',
                        type: 'error'
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const handleLogout = () => {
    return async dispatch => {
        try {
            await userServices.logout()
            dispatch({
                type: HANDLE_SIGNOUT_SUCCESS
            })

            dispatch({
                type: OPEN_TOAST,
                data: {
                    message: 'Logout successfully!',
                    type: 'success'
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}
