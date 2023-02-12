import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCustomerAddress, setCustomerCity, setCustomerProvince } from "~/actions/customer.actions"
import { getVNDistricts, getVNProvices } from "~/services/otherServices"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function CreateCustomerAddress() {
    const { newCustomer } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()
    const [provinceCode, setProvinceCode] = useState('')
    const [cityCode, setCityCode] = useState('')
    const [provinceList, setProvinceList] = useState([])
    const [districtsList, setDistrictsList] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getVNProvices()
            if (data) {
                setProvinceList(data)
            }
        }
        fetchApi()
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getVNDistricts(provinceCode)
            if (data) {
                setDistrictsList(data)
            }
        }
        fetchApi()
    }, [provinceCode])

    useEffect(() => {
        if(provinceList.length) {
            dispatch(setCustomerProvince(provinceList.find(prov => prov.code === provinceCode).name))
        }
        if(districtsList.length) {
            dispatch(setCustomerCity(districtsList.find(dist => dist.code === cityCode).name))
        }
        // eslint-disable-next-line
    }, [provinceCode, cityCode])

    return (
        <Card>
            <CardHeader>
                <h4 className="font-semibold">Address</h4>
            </CardHeader>
            <CardBody>
                <div className="mb-4 flex flex-wrap gap-y-4">
                    <div className="w-full sm:w-1/2 sm:pr-2">
                        <label className="block font-medium mb-2">Province</label>
                        <select
                            className="border border-secondary-bg w-full rounded p-2 outline-none"
                            value={provinceCode}
                            onChange={e => setProvinceCode(e.target.value)}
                        >
                            <option value=''>Select province</option>
                            {provinceList.map(prov => (
                                <option value={prov.code} key={prov._id}>{prov.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-2">
                        <label className="block font-medium mb-2">City/District</label>
                        <select
                            className="border border-secondary-bg w-full rounded p-2 outline-none"
                            value={cityCode}
                            onChange={e => setCityCode(e.target.value)}
                        >
                            <option value=''>Select city / district</option>
                            {districtsList.map(dist => (
                                <option value={dist.code} key={dist._id}>{dist.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4 flex flex-wrap gap-y-4">
                    <div className="w-full">
                        <label className="block font-medium mb-2">Address*</label>
                        <input
                            type='text'
                            placeholder="Enter address"
                            value={newCustomer.address}
                            onChange={e => dispatch(setCustomerAddress(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CreateCustomerAddress