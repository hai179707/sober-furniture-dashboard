import Tippy from "@tippyjs/react/headless"
import { RiArrowDownSLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "~/actions/product.actions"

function ProductPageHeader() {
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteProduct(product._id))
    }

    return (
        <>
            {product
                &&
                <div className="flex justify-between mb-5">
                    <h3 className="font-semibold text-xl">{product.name}</h3>
                    <div className="flex justify-end sm:block">
                        <Tippy
                            interactive
                            trigger="click"
                            placement="bottom"
                            render={attr => (
                                <ul {...attr} className='bg-white py-2 rounded'>
                                    <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg">
                                        <a href={process.env.REACT_APP_WEBSITE_URL + '/product/' + product._id} target='_blank' rel="noreferrer">
                                            Preview
                                        </a>
                                    </li>
                                    <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg" onClick={handleDelete}>Delete</li>
                                </ul>
                            )}
                        >
                            <button className="bg-secondary-bg max-h-[45px] py-1 px-3 sm:py-2 sm:px-5 rounded flex items-center gap-2"><span>Actions</span><RiArrowDownSLine /></button>
                        </Tippy>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductPageHeader