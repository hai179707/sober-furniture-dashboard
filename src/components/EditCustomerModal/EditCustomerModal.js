import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { useState } from "react"
import { RiCloseLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { setEditCustomerInfoModal, updateCustomer } from "~/actions/customer.actions"
import { getVNDistricts, getVNProvices } from "~/services/otherServices"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function EditCustomerModal() {
    const dispatch = useDispatch()
    const { customer } = useSelector(state => state.customerReducer)
    const [fullName, setFullName] = useState(customer.fullName)
    const [email, setEmail] = useState(customer.email)
    const [address, setAddress] = useState(customer.address)
    const [phone, setPhone] = useState(customer.phone)
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')

    const [provinceList, setProvinceList] = useState([])
    const [districtsList, setDistrictsList] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getVNProvices()
            if (data) {
                setProvinceList(data)
                const provinceCode = data.find(prov => prov.name === customer.province)
                provinceCode && setProvince(provinceCode.code)
            }
        }
        fetchApi()
    }, [customer.province])

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getVNDistricts(province)
            if (data) {
                setDistrictsList(data)
                const distCode = data.find(dist => dist.name === customer.city)
                distCode && setCity(distCode.code)
            }
        }
        fetchApi()
    }, [province, customer.city])

    const handleSubmit = e => {
        e.preventDefault()
        const provinceVal = provinceList.find(prov => prov.code === province)
        const distVal = districtsList.find(dist => dist.code === city)
        dispatch(updateCustomer(customer._id, {
            fullName,
            email,
            address,
            phone,
            province: provinceVal.name,
            city: distVal.name
        }))
        dispatch(setEditCustomerInfoModal(false))
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, duration: 0.3 }}
                exit={{ opacity: 0, duration: 0.3 }}
                className='fixed z-10 top-0 left-0 h-screen w-screen bg-black01 flex justify-center items-center text-sm'
            >
                <div className="w-full px-2 sm:px-0 sm:w-1/2">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between text-base">
                                <span>Update customer information</span>
                                <RiCloseLine className="cursor-pointer text-xl" onClick={() => dispatch(setEditCustomerInfoModal(false))} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="flex">
                                        <div className="w-full sm:w-1/2 px-2">
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">Customer name</label>
                                                <input
                                                    type='text'
                                                    value={fullName}
                                                    onChange={e => setFullName(e.target.value)}
                                                    placeholder='Customer name'
                                                    className="border border-secondary-bg w-full rounded p-2 outline-none"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">Email</label>
                                                <input
                                                    type='email'
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder='Email'
                                                    className="border border-secondary-bg w-full rounded p-2 outline-none"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">Phone</label>
                                                <input
                                                    type='text'
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    placeholder='Phone'
                                                    className="border border-secondary-bg w-full rounded p-2 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 px-2">
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">Province</label>
                                                <select
                                                    className="border border-secondary-bg w-full rounded p-2 outline-none"
                                                    value={province}
                                                    onChange={e => setProvince(e.target.value)}
                                                >
                                                    <option value=''>Select province</option>
                                                    {provinceList.map(prov => (
                                                        <option value={prov.code} key={prov._id}>{prov.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">District/City</label>
                                                <select
                                                    className="border border-secondary-bg w-full rounded p-2 outline-none"
                                                    value={city}
                                                    onChange={e => setCity(e.target.value)}
                                                >
                                                    <option value=''>Select city / district</option>
                                                    {districtsList.map(dist => (
                                                        <option value={dist.code} key={dist._id}>{dist.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-medium mb-2">Address</label>
                                                <input
                                                    type='text'
                                                    value={address}
                                                    onChange={e => setAddress(e.target.value)}
                                                    placeholder='Address'
                                                    className="border border-secondary-bg w-full rounded p-2 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-5 mt-5">
                                    <button className="py-2 px-4 bg-secondary-bg rounded" onClick={() => dispatch(setEditCustomerInfoModal(false))}>Cancel</button>
                                    <button className="py-2 px-4 bg-blue-600 text-white rounded">Update</button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default EditCustomerModal