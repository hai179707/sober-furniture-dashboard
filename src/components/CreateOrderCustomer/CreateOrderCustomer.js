import { useEffect } from "react"
import { useState } from "react"
import { RiEdit2Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setNewOrderCustomer } from "~/actions/order.actions"
import routes from "~/config/routes"
import useDebounce from "~/hooks/useDebounce"
import { getCustomers } from "~/services/customerServices"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"
import SearchForm from "../SearchForm"

function CreateOrderCustomer() {
    const { newOrder } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const searchValueDebounce = useDebounce(searchValue, 1000)
    const [customerList, setCustomerList] = useState([])
    const [openList, setOpenList] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getCustomers(`?page=${page}&limit=10&query=${searchValueDebounce}`)
            if (res) {
                setCustomerList(res.data)
                setTotal(res.total)
            }
        }
        fetchApi()
    }, [searchValueDebounce, page])

    const handleChooseCustomer = customer => {
        dispatch(setNewOrderCustomer(customer))
        setSearchValue('')
        setOpenList(false)
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <p className="font-semibold">Customer</p>
                    <Link to={routes.createCustomer} className="flex items-center gap-2 text-blue-600">
                        <span className="text-xl">+</span>
                        <span>New customer</span>
                    </Link>
                </div>
            </CardHeader>
            <CardBody>
                <div className="relative">
                    <div onClick={() => setOpenList(true)}>
                        <SearchForm value={searchValue} placeholder='Search customer' onChange={e => setSearchValue(e.target.value)} onClear={() => setSearchValue('')} />
                    </div>
                    {openList
                        &&
                        <div className="absolute left-0 right-0 top-14 bg-white border border-gray-bg rounded">
                            <div className="max-h-[300px] overflow-y-scroll pl-2 py-2 small-scroll">
                                {customerList.map(customer => (
                                    <div
                                        key={customer._id}
                                        className='flex gap-2 items-center py-3 px-2 border-b border-gray-bg cursor-pointer hover:bg-gray-bg'
                                        onClick={() => handleChooseCustomer(customer)}>
                                        <img src={customer.photoURL} alt='customer' className="w-9 h-9 rounded-full" />
                                        <div className="font-semibold">{customer.fullName}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t-2 border-gray-bg flex justify-between">
                                <div className="flex gap-2 text-2xl">
                                    <span className="px-2 cursor-pointer" onClick={() => page > 1 && setPage(page - 1)}>{'<'}</span>
                                    <span className="px-2 cursor-pointer" onClick={() => page < Math.ceil(total / 10) && setPage(page + 1)}>{'>'}</span>
                                </div>
                                <div>
                                    <button className="bg-secondary-bg px-3 py-2 rounded" onClick={() => setOpenList(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    }
                    {!!newOrder.customer
                        &&
                        <div className="py-5">
                            <Link to={'/customers/' + newOrder.customer._id} className="text-blue-600 border-b border-gray-bg pb-2 flex justify-between">
                                <span>{newOrder.customer.fullName}</span>
                                <RiEdit2Line className="text-lg text-black" />
                            </Link>
                            <p className="mt-3">Email: <span className="font-semibold">{newOrder.customer.email}</span></p>
                            <p className="mt-3">Phone: <span className="font-semibold">{newOrder.customer.phone}</span></p>
                            <p className="mt-3">Address: {newOrder.customer.address}{!!newOrder.customer.city && ', ' + newOrder.customer.city}{!!newOrder.customer.province && ', ' + newOrder.customer.province}</p>
                        </div>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default CreateOrderCustomer