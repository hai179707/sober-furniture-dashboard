import { useEffect, useState } from "react"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import { getTotalOrder } from "~/services/orderServices"
import { MdAddShoppingCart, MdCancelPresentation, MdOutlineDeliveryDining, MdOutlinePayment } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import { RiArrowRightSLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import routes from "~/config/routes"

function OrderStatusOverview() {
    const [total, setTotal] = useState({})

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getTotalOrder()
            setTotal(data)
        }
        fetchApi()
        // eslint-disable-next-line
    }, [])

    return (
        <Card>
            <CardHeader>
                <p className="font-medium">Order statuses</p>
            </CardHeader>
            <CardBody>
                {total
                    &&
                    <ul>
                        <li>
                            <Link to={routes.orders + '?page=1&limit=20&status=open&tab=new'} className="flex items-center gap-2 py-4 px-2 rounded-md cursor-pointer hover:bg-gray-bg">
                                <MdAddShoppingCart className="text-xl min-w-[20px]" />
                                <span className="flex-1">{total.open} order(s) <span className="font-medium">unconfirmed</span></span>
                                <RiArrowRightSLine className="text-xl" />
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.orders + '?page=1&limit=20&payment=unpaid&tab=unpaid'} className="flex items-center gap-2 py-4 px-2 rounded-md border-t border-gray-bg cursor-pointer hover:bg-gray-bg">
                                <MdOutlinePayment className="text-xl min-w-[20px]" />
                                <span className="flex-1">{total.unpaid} order(s) <span className="font-medium">waiting for payment</span></span>
                                <RiArrowRightSLine className="text-xl" />
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.orders + '?page=1&limit=20&delivery=not%20shipped%20yet&tab=not_shipped_yet'} className="flex items-center gap-2 py-4 px-2 rounded-md border-t border-gray-bg cursor-pointer hover:bg-gray-bg">
                                <MdOutlineDeliveryDining className="text-xl min-w-[20px]" />
                                <span className="flex-1">{total.notShippedYet} order(s) <span className="font-medium">waiting for deliver</span></span>
                                <RiArrowRightSLine className="text-xl" />
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.orders + '?page=1&limit=20&delivery=delivering'} className="flex items-center gap-2 py-4 px-2 rounded-md border-t border-gray-bg cursor-pointer hover:bg-gray-bg">
                                <TbTruckDelivery className="text-xl min-w-[20px]" />
                                <span className="flex-1">{total.delivering} order(s) <span className="font-medium">on the way</span></span>
                                <RiArrowRightSLine className="text-xl" />
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.orders + '?page=1&limit=20&status=cancel'} className="flex items-center gap-2 py-4 px-2 rounded-md border-t border-gray-bg cursor-pointer hover:bg-gray-bg">
                                <MdCancelPresentation className="text-xl min-w-[20px]" />
                                <span className="flex-1">{total.cancel} order(s) <span className="font-medium">canceled</span></span>
                                <RiArrowRightSLine className="text-xl" />
                            </Link>
                        </li>
                    </ul>
                }
            </CardBody>
        </Card>
    )
}

export default OrderStatusOverview