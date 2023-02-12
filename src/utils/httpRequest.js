import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

instance.interceptors.request.use(
    config => {
        const accessToken = JSON.parse(localStorage.getItem("accessToken"))
        if (accessToken) {
            config.headers["Authorization"] = 'Bearer ' + accessToken
        }
        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalConfig = error.config
        if (originalConfig.url !== "/login" && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true

                try {
                    const res = await instance.post('/refresh', {
                        refreshToken: JSON.parse(localStorage.getItem("refreshToken"))
                    })
                    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken))
                    localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken))

                    return instance(originalConfig)
                }
                catch (_error) {
                    return Promise.reject(_error)
                }
            }
        }

        return Promise.reject(error)
    }
)

export const get = async (path) => {
    const response = await instance.get(path, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    return response.data
}

export const put = async (path, data = {}) => {
    const response = await instance.put(path, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    return response.data
}

export const post = async (path, data = {}) => {
    const response = await instance.post(path, data, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    return response.data
}

export const deleteRequest = async (path) => {
    const response = await instance.delete(path, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
    })
    return response.data
}