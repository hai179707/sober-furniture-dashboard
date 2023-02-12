import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

function CustomerItem({ data }) {
    return (
        <div className="flex py-3 border-b border-gray-bg">
            <div className="px-1 w-1/3 flex-1 xs:flex-auto">
                <Link to={'/customers/' + data._id} className='text-blue-600'>{data.fullName}</Link>
            </div>
            <div className="px-1 w-1/2 sm:w-1/6">{data.phone}</div>
            <div className="px-1 w-1/4 hidden xs:block">{data.email}</div>
            <div className="px-1 text-center w-1/12 hidden sm:block">{data.orders.length}</div>
            <div className="px-1 text-center w-1/6 hidden sm:block">
                {data.orders[0]
                    &&
                    <Link to={'/orders/' + data.orders[0].orderCode} className='text-blue-600'>#{data.orders[0].orderCode}</Link>
                }
            </div>
        </div>
    )
}

CustomerItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default CustomerItem