import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { addNewOrderProduct } from '~/actions/order.actions'
import useDebounce from '~/hooks/useDebounce'
import { getProducts } from '~/services/productServices'
import Card from '../Card'
import CardBody from '../CardBody'
import CardHeader from '../CardHeader'

function CreateOrderProductsModal({ searchValue, onChange, close }) {
    const dispatch = useDispatch()
    const searchInp = useRef()
    const searchValueDebounce = useDebounce(searchValue, 1000)
    const [productList, setProductList] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(20)

    useEffect(() => {
        searchInp.current.focus()
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getProducts(page, 10, searchValueDebounce)
            if (res) {
                setProductList(res.data)
                setTotal(res.total)
            }
        }
        fetchApi()
    }, [searchValueDebounce, page])

    const handleChooseProduct = product => {
        dispatch(addNewOrderProduct(product))
        close()
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, duration: 0.3 }}
                exit={{ opacity: 0, duration: 0.3 }}
                className='fixed z-10 top-0 left-0 h-screen w-screen bg-black01 flex justify-center items-center'
            >
                <div className="w-full px-2 sm:px-0 sm:w-2/3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <span>Search products</span>
                                <RiCloseLine className="cursor-pointer text-xl" onClick={close} />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className='flex border border-secondary-bg rounded relative max-w-full overflow-hidden'>
                                <button className='text-lg text-secondary px-2'><RiSearchLine /></button>
                                <input
                                    ref={searchInp}
                                    type='text'
                                    value={searchValue}
                                    onChange={e => onChange(e.target.value)}
                                    className='flex-1 border-none outline-none p-3 max-w-[84%] min-[320px]:max-w-none'
                                />
                            </div>
                            <div>
                                {productList.map(prod => (
                                    <div key={prod._id} onClick={() => handleChooseProduct(prod)} className='flex items-center px-3 py-2 border-b border-gray-bg cursor-pointer hover:bg-gray-bg'>
                                        <div className='w-2/3 flex items-center gap-2'>
                                            <div className='w-9 h-9 rounded overflow-hidden flex items-center'>
                                                <img src={prod.images[0]} alt={prod.name} className='w-full' />
                                            </div>
                                            <div>
                                                {prod.name}
                                            </div>
                                        </div>
                                        <div className='w-1/6 text-center'>{prod.amount} in stock</div>
                                        <div className='w-1/6 text-right'>${prod.promotionPrice}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center gap-5 mt-5">
                                <div>
                                    {total > 10
                                        &&
                                        <div className='flex gap-2 text-2xl'>
                                            <span className='cursor-pointer' onClick={() => page > 1 && setPage(page-1)}>{'<'}</span>
                                            <span className='cursor-pointer' onClick={() => page < Math.ceil(total/10) && setPage(page+1)}>{'>'}</span>
                                        </div>
                                    }
                                </div>
                                <button className="py-2 px-4 bg-black text-white rounded" onClick={close}>Close</button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

CreateOrderProductsModal.propTypes = {
    searchValue: PropTypes.string
}

export default CreateOrderProductsModal