import * as httpRequest from '~/utils/httpRequest'

export const login = async (data) => {
    try {
        const res = await httpRequest.post('/login', data)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {
    try {
        const res = httpRequest.post('/logout', {
            refreshToken: JSON.parse(localStorage.getItem("refreshToken"))
        }, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}