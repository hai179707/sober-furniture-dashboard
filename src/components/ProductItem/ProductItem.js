import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

function ProductItem({ data }) {
    return (
        <div className="flex py-3 border-b border-gray-bg">
                <Link to={'/products/' + data._id} className="px-1 w-2/3 text-blue-600 flex gap-2">
                    <img src={data.images[0]} alt='product' width={48} className='min-w-[48px] rounded' />
                    <span>{data.name}</span>
                </Link>
                <div className="px-1 w-1/3 sm:1/12 text-right sm:text-center">{data.amount}<span className='text-secondary'> in stock</span></div>
                <div className="px-1 w-1/4 text-center hidden sm:block">{data.type.name}</div>
        </div>
    )
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default ProductItem