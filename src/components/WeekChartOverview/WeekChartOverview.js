import { useEffect, useState } from "react"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import { getLastWeekTotal } from "~/services/orderServices"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
)

function WeekChartOverview() {
    const [result, setResult] = useState([])

    const getDate = (num = 0) => {
        const d = new Date(new Date().setDate(new Date().getDate() - num))
        return d.getDate() + '/' + (d.getMonth() + 1)
    }

    const data = {
        labels: [getDate(6), getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate() + ' (today)'],
        datasets: [
            {
                label: 'Orders',
                data: result,
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgb(37, 99, 235)',
            }
        ],

    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
    }

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getLastWeekTotal()
            if (res) {
                setResult(res)
            }
        }
        fetchApi()
        // eslint-disable-next-line
    }, [])

    return (
        <Card>
            <CardHeader>
                <p className="font-medium">Here’s your business results <b>in the last 7 days</b></p>
            </CardHeader>
            <CardBody>
                {!!result.length
                    &&
                    <Line className="max-h-[350px]" options={options} data={data} />
                }
            </CardBody>
        </Card>
    )
}

export default WeekChartOverview