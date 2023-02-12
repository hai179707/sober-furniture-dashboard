import { useState } from "react"
import { Link } from "react-router-dom"
import routes from "~/config/routes"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"
import SearchForm from "~/components/SearchForm"
import CreateOrderProductsModal from "../CreateOrderProductsModal"
import Button from "../Button"
import { useEffect } from "react"
import useDebounce from "~/hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import { RiCloseLine } from "react-icons/ri"
import { removeNewOrderProduct, setNewOrderProductQty } from "~/actions/order.actions"

function CreateOrderProducts() {
    const { newOrder } = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const searchValueDebounce = useDebounce(searchValue, 1000)

    useEffect(() => {
        setIsOpenModal(!!searchValueDebounce)
    }, [searchValueDebounce])

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <p className="font-semibold">Products</p>
                    <Link to={routes.addProduct} className="flex items-center gap-2 text-blue-600">
                        <span className="text-xl">+</span>
                        <span>New product</span>
                    </Link>
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex gap-4">
                    <div className="flex-1 hidden sm:block">
                        <SearchForm value={searchValue} placeholder='Search products' onChange={e => setSearchValue(e.target.value)} onClear={() => setSearchValue('')} />
                    </div>
                    <Button onClick={() => setIsOpenModal(true)}>Browse products</Button>
                </div>
                {!!newOrder.products.length
                    &&
                    <div className="my-4">
                        <div className="flex bg-gray-bg py-3 px-2">
                            <div className="w-1/2">Product(s)</div>
                            <div className="w-5/12 sm:w-1/4 md:1/6 text-center">Quantity</div>
                            <div className="w-1/12 text-center hidden lg:block">Price($)</div>
                            <div className="w-1/6 hidden sm:block text-center">Total($)</div>
                            <div className="w-1/12"></div>
                        </div>
                        {newOrder.products.map((prod, index) => (
                            <div key={prod.product._id} className='flex py-3 px-2 border-b border-gray-bg items-center'>
                                <div className="w-1/2 flex items-center gap-2">
                                    <div className='w-9 h-9 rounded overflow-hidden flex items-center'>
                                        <img src={prod.product.images[0]} alt={prod.product.name} className='w-full' />
                                    </div>
                                    <div>
                                        {prod.product.name}
                                    </div>
                                </div>
                                <div className="w-5/12 sm:w-1/4 md:1/6 text-center">
                                    <input 
                                        value={prod.qty} 
                                        type='number' 
                                        onChange={e => e.target.value >= 1 && e.target.value <= prod.product.amount && dispatch(setNewOrderProductQty(index, e.target.value))}
                                        className='w-[80%] border border-secondary-bg outline-none text-center h-8 rounded'
                                    />
                                </div>
                                <div className="w-1/12 text-center hidden lg:block">{prod.product.promotionPrice}</div>
                                <div className="w-1/6 hidden sm:block text-center">{prod.product.promotionPrice * prod.qty}</div>
                                <div className="w-1/12 flex justify-center">
                                    <RiCloseLine className="cursor-pointer" onClick={() => dispatch(removeNewOrderProduct(index))} />
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {isOpenModal
                    &&
                    <CreateOrderProductsModal searchValue={searchValue} onChange={setSearchValue} close={() => setIsOpenModal(false)} />
                }
            </CardBody>
        </Card>
    )
}

export default CreateOrderProducts