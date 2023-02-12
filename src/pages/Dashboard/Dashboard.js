import HoursChartOverview from "~/components/HoursChartOverview"
import OrderStatusOverview from "~/components/OrderStatusOverview"
import TodayResultOverview from "~/components/TodayResultOverview"
import WeekChartOverview from "~/components/WeekChartOverview"

function Dashboard() {
    return (
        <div className="px-2">
            <div className="flex flex-wrap py-3">
                <div className="w-full md:w-2/3 md:pr-3">
                    <TodayResultOverview />
                    <HoursChartOverview />
                    <WeekChartOverview />
                </div>
                <div className="w-full md:w-1/3 md:pl-3">
                    <OrderStatusOverview />
                </div>
            </div>
        </div>
    )
}

export default Dashboard