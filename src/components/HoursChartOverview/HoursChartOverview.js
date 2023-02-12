import { useEffect, useState } from "react"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import { getHoursTotal } from "~/services/orderServices"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)

function FiveHoursChartOverview() {
    const [todayResult, setTodayResult] = useState([])
    const [yesterdayResult, setYesterdayResult] = useState([])
    const getHour = (num = 0) => new Date(new Date().setHours(new Date().getHours() - num)).getHours()

    const data = {
        labels: [getHour(5) + 'h', getHour(4) + 'h', getHour(3) + 'h', getHour(2) + 'h', getHour(1) + 'h', getHour() + 'h (now)'],
        datasets: [
            {
                label: 'Today',
                data: todayResult,
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgb(37, 99, 235)',
            },
            {
                label: 'Yesterday',
                data: yesterdayResult,
                borderColor: 'rgb(156, 163, 175)',
                backgroundColor: 'rgb(156, 163, 175)',
            }
        ],

    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
    }

    useEffect(() => {
        const fetchApi = async () => {
            const today = await getHoursTotal()
            setTodayResult(today)
            const yesterday = await getHoursTotal(new Date(new Date().setDate(new Date().getDate() - 1)).toISOString())
            setYesterdayResult(yesterday)
        }
        fetchApi()
        // eslint-disable-next-line
    }, [])

    return (
        <Card>
            <CardHeader>
                <p className="font-medium">Here’s your business results <b>in the last 6 hours</b></p>
            </CardHeader>
            <CardBody>
                {!!todayResult.length
                    &&
                    <Line className="max-h-[350px]" options={options} data={data} />
                }
            </CardBody>
        </Card>
    )
}

export default FiveHoursChartOverview