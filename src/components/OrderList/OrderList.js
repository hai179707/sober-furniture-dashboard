import { useSelector } from "react-redux"
import OrderItem from "~/components/OrderItem"

function OrderList() {
    const { orders } = useSelector(state => state.orderReducer)

    return (
        <div className="mt-3">
            <div className="flex py-3 font-semibold">
                <span className='px-1 w-5 sm:w-7'></span>
                <span className='px-1 flex-1 min-[320px]:flex-0 min-[320px]:w-1/4 sm:w-1/6 lg:w-1/12'>Order code</span>
                <span className='px-1 flex-1 sm:w-1/6 xl:w-1/12 hidden min-[320px]:block text-xs sm:text-sm'>
                    <span className='hidden xs:block'>Date</span>
                    <span className='xs:hidden text-sm'>Customer</span>
                </span>
                <span className='px-1 flex-1 hidden xs:block'>Customer</span>
                <span className='px-1 w-1/6 hidden sm:block'>Payment</span>
                <span className='px-1 w-1/6 hidden sm:block'>Delivery</span>
                <span className='px-1 w-1/6 sm:w-1/12 text-right'>Total</span>
            </div>
            {orders.map(order => (
                <OrderItem data={order} key={order.orderCode} />
            ))}
        </div>
    )
}

export default OrderList