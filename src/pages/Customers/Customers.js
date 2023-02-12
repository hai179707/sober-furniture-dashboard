import Tippy from "@tippyjs/react/headless"
import { useEffect } from "react"
import { RiArrowDownSLine, RiUserAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { getCustomers, setCustomerLimit, setCustomerPage } from "~/actions/customer.actions"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import CustomerList from "~/components/CustomerList"
import PageAndLimitController from "~/components/PageAndLimitController"
import SearchFilter from "~/components/SearchFilter"
import routes from "~/config/routes"
import { exportCustomersExcel } from "~/services/exportServices"

function Customers() {
    const { total, page, limit } = useSelector(state => state.customerReducer)
    const dispatch = useDispatch()
    const location = useLocation()
    const query = location.search
    const tab = new URLSearchParams(query).get('tab')
    const pageParam = new URLSearchParams(query).get('page')
    const limitParam = new URLSearchParams(query).get('limit')

    useEffect(() => {
        dispatch(getCustomers(query))
        if (limitParam) dispatch(setCustomerLimit(limitParam))
        if (pageParam) dispatch(setCustomerPage(pageParam))
        // eslint-disable-next-line
    }, [query])

    return (
        <div className="px-2">
            <div className="flex justify-between mb-5 items-center">
                <h3 className="text-xl font-semibold">Customers</h3>
                <div className="flex gap-2">
                    <Tippy
                        interactive
                        trigger="click"
                        placement="bottom"
                        render={attr => (
                            <>
                                <ul {...attr} className='bg-white rounded shadow'>
                                    <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg" onClick={() => exportCustomersExcel(query)}>Export customers</li>
                                </ul>
                            </>
                        )}
                    >
                        <button className="bg-secondary-bg max-h-[45px] py-1 px-3 sm:py-2 sm:px-5 rounded flex items-center gap-2"><span>Actions</span><RiArrowDownSLine /></button>
                    </Tippy>
                    <Link to={routes.createCustomer} className='flex gap-2 items-center font-semibold bg-blue-600 text-white rounded-md p-3'>
                        <RiUserAddLine className="text-base" />
                        <span className="hidden sm:block">Create Customer</span>
                    </Link>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-end xs:justify-between">
                        <ul className="hidden xs:flex gap-3 lg:gap-10 cursor-pointer">
                            <li>
                                <Link
                                    to={routes.customers}
                                    className={!tab ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    All customers
                                </Link>
                            </li>
                            <li className="hidden sm:list-item">
                                <Link
                                    to={`?page=${page}&limit=${limit}&tab=loyal&orders_count_min=${process.env.REACT_APP_ORDERS_COUNT_MIN}`}
                                    className={tab === 'loyal' ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    Loyal customer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </CardHeader>
                <CardBody>
                    <SearchFilter page={page} limit={limit} />
                    <CustomerList />
                    <PageAndLimitController total={total} page={page} limit={limit} />
                </CardBody>
            </Card>
        </div>
    )
}

export default Customers