import { useEffect, useState } from "react"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import { getOrders } from "~/services/orderServices"

function TodayResultOverview() {
    const [ordersToday, setOrdersToday] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const today = new Date().toLocaleDateString('en-CA')
            const data = await getOrders('?startDate=' + today + '&endDate=' + today)
            setOrdersToday(data.data)
        }
        fetchApi()
        // eslint-disable-next-line
    }, [])

    return (
        <Card>
            <CardHeader>
                <p className="font-medium">Here’s your business results <b>today</b></p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col sm:flex-row">
                    {ordersToday
                        &&
                        <>
                            <div className="w-full sm:w-1/2 border-b sm:border-r sm:border-b-0 border-secondary-bg mb-4 pb-2 sm:pb-0 sm:mb-0 sm:pr-3 sm:mr-3">
                                <p>NET SALES</p>
                                <p className="font-semibold text-xl md:text-3xl py-2 sm:py-3">
                                    ${ordersToday.reduce((sum, order) => sum + order.cost, 0)}
                                </p>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <p>TOTAL ORDER</p>
                                <p className="font-semibold text-xl md:text-3xl py-2 sm:py-3">
                                    {ordersToday.length > 1
                                        ?
                                        ordersToday.length + ' orders'
                                        :
                                        ordersToday.length + ' order'
                                    }
                                </p>
                            </div>
                        </>}
                </div>
            </CardBody>
        </Card>
    )
}

export default TodayResultOverview