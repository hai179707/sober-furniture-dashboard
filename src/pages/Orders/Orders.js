import Tippy from "@tippyjs/react/headless"
import { useEffect, useState } from "react"
import { BsCalendarDate } from 'react-icons/bs'
import { TbShoppingCartPlus } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

import { getOrders, setOrderLimit, setOrderPage } from "~/actions/order.actions"

import Card from "~/components/Card"
import routes from "~/config/routes"
import CardBody from "~/components/CardBody"
import OrderList from "~/components/OrderList"
import CardHeader from "~/components/CardHeader"
import SearchFilter from "~/components/SearchFilter"
import PageAndLimitController from "~/components/PageAndLimitController"
import { exportOrdersExcel } from "~/services/exportServices"
import { RiArrowDownSLine } from "react-icons/ri"

function Orders() {
    const dispatch = useDispatch()
    const { total, page, limit } = useSelector(state => state.orderReducer)
    const location = useLocation()
    const navigate = useNavigate()
    const query = location.search
    const tab = new URLSearchParams(query).get('tab')
    const pageParam = new URLSearchParams(query).get('page')
    const limitParam = new URLSearchParams(query).get('limit')
    const [selectDateValue, setSelectDateValue] = useState('')
    const [rangeDate, setRangeDate] = useState([new Date(), new Date()])
    const [openCalendar, setOpenCalendar] = useState(false)

    useEffect(() => {
        dispatch(getOrders(query))
        if (limitParam) dispatch(setOrderLimit(limitParam))
        if (pageParam) dispatch(setOrderPage(pageParam))
        // eslint-disable-next-line
    }, [query])

    useEffect(() => {
        const date = new Date()
        const today = date.toLocaleDateString('en-CA')
        const yesterday = new Date(date.setDate(date.getDate() - 1)).toLocaleDateString('en-CA')
        const lastWeek = new Date(date.setDate(date.getDate() - 7)).toLocaleDateString('en-CA')
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1)).toLocaleDateString('en-CA')
        const threeMonthsAgo = new Date(date.setMonth(date.getMonth() - 3)).toLocaleDateString('en-CA')

        switch (selectDateValue) {
            case 'all':
                navigate(`?page=${page}&limit=${limit}`)
                break
            case 'today':
                navigate(`?page=${page}&limit=${limit}&startDate=${today}&endDate=${today}`)
                break
            case 'yesterday':
                navigate(`?page=${page}&limit=${limit}&startDate=${yesterday}&endDate=${yesterday}`)
                break
            case 'last-week':
                navigate(`?page=${page}&limit=${limit}&startDate=${lastWeek}&endDate=${today}`)
                break
            case 'last-month':
                navigate(`?page=${page}&limit=${limit}&startDate=${lastMonth}&endDate=${today}`)
                break
            case '3-months-ago':
                navigate(`?page=${page}&limit=${limit}&startDate=${threeMonthsAgo}&endDate=${today}`)
                break
            default:
                break
        }
        setRangeDate([new Date(), new Date()])
        // eslint-disable-next-line
    }, [selectDateValue])


    useEffect(() => {
        if (!!rangeDate) {
            const date = new Date()
            const [startDate, endDate] = rangeDate
            const today = date.toLocaleDateString('en-CA')
            const start = startDate.toLocaleDateString('en-CA')
            const end = endDate.toLocaleDateString('en-CA')
            if (start !== today) {
                navigate(`?page=${page}&limit=${limit}&startDate=${start}&endDate=${end}`)
            }
        }
        // eslint-disable-next-line
    }, [rangeDate])

    return (
        <div className="px-2">
            <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Orders</h3>
                <div className="flex gap-2">
                    <Tippy
                        interactive
                        trigger="click"
                        placement="bottom"
                        render={attr => (
                            <>
                                <ul {...attr} className='bg-white rounded shadow'>
                                    <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg" onClick={() => exportOrdersExcel(query)}>Export orders</li>
                                </ul>
                            </>
                        )}
                    >
                        <button className="bg-secondary-bg max-h-[45px] py-1 px-3 sm:py-2 sm:px-5 rounded flex items-center gap-2"><span>Actions</span><RiArrowDownSLine /></button>
                    </Tippy>
                    <Link to={routes.createOrder} className='flex gap-2 items-center font-semibold bg-blue-600 text-white rounded-md p-3'>
                        <TbShoppingCartPlus className="text-base" />
                        <span className="hidden sm:block">Create Order</span>
                    </Link>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-end xs:justify-between">
                        <ul className="hidden xs:flex gap-3 lg:gap-10 cursor-pointer">
                            <li>
                                <Link
                                    to={routes.orders}
                                    className={!tab ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    All orders
                                </Link>
                            </li>
                            <li className="hidden sm:list-item">
                                <Link
                                    to={`?page=${page}&limit=${limit}&status=open&tab=new`}
                                    className={tab === 'new' ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    New
                                </Link>
                            </li>
                            <li className="hidden sm:list-item">
                                <Link
                                    to={`?page=${page}&limit=${limit}&delivery=not shipped yet&tab=not_shipped_yet`}
                                    className={tab === 'not_shipped_yet' ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    Not shipped yet
                                </Link>
                            </li>
                            <li className="hidden sm:list-item">
                                <Link
                                    to={`?page=${page}&limit=${limit}&payment=unpaid&tab=unpaid`}
                                    className={tab === 'unpaid' ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    Unpaid
                                </Link>
                            </li>
                        </ul>
                        <div className="flex items-center">
                            <select
                                value={selectDateValue}
                                onChange={e => setSelectDateValue(e.target.value)}
                                className='outline-none max-w-[60px] md:max-w-none'
                            >
                                <option value={'all'}>All time</option>
                                <option value={'today'}>Today</option>
                                <option value={'yesterday'}>Yesterday</option>
                                <option value={'last-week'}>Last week</option>
                                <option value={'last-month'}>Last month</option>
                                <option value={'3-months-ago'}>3 months ago</option>
                            </select>
                            <div className="flex gap-2 items-center border-l-2 border-secondary-bg ml-2 pl-2">
                                {openCalendar
                                    ?
                                    <DateRangePicker value={rangeDate} onChange={setRangeDate} format='yyyy.MM.dd' />
                                    :
                                    <BsCalendarDate className="text-lg cursor-pointer" onClick={() => setOpenCalendar(true)} />
                                }
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <SearchFilter page={page} limit={limit} />
                    <OrderList />
                    <PageAndLimitController total={total} page={page} limit={limit} />
                </CardBody>
            </Card>
        </div>
    )
}

export default Orders