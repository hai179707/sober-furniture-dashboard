import PropTypes from 'prop-types'
import { useState } from 'react'
import { useEffect } from 'react'
import { getProduct } from '~/services/productServices'

function CustomerOrderItemDetailItem({ data }) {
    const [product, setProduct] = useState()

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getProduct(data.product)
            if (res) setProduct(res)
        }
        fetchApi()
    }, [data])

    return (
        <>
            {product
                &&
                <div className='flex gap-2 py-1'>
                    <div className='w-12 h-12 min-w-[48px] overflow-hidden'>
                        <img alt='product' src={product.images[0]} width='100%' />
                    </div>
                    <div>
                        <p>{product.name}</p>
                        <p className='text-secondary'>{data.qty} x {product.promotionPrice}</p>
                    </div>
                </div>
            }
        </>
    )
}

CustomerOrderItemDetailItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default CustomerOrderItemDetailItem