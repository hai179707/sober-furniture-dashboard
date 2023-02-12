import PropTypes from 'prop-types'
import CustomerOrderItemDetailItem from '../CustomerOrderItemDetailItem'

function CustomerOrderItemDetail({ data }) {
    return (
        <div className='pt-2'>
            {data.map(prod => (
                <CustomerOrderItemDetailItem data={prod} key={prod.product} />
            ))}
        </div>
    )
}

CustomerOrderItemDetail.propTypes = {
    data: PropTypes.array.isRequired
}

export default CustomerOrderItemDetail