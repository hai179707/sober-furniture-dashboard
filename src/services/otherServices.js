import axios from "axios"

export const getVNProvices = async () => {
    try {
        const res = await axios('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
        return res.data.data.data
    } catch (error) {
        console.log(error)
    }
}

export const getVNDistricts = async provinceCode => {
    try {
        const res = await axios('https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=' + provinceCode +'&limit=-1')
        return res.data.data.data
    } catch (error) {
        console.log(error)
    }
}