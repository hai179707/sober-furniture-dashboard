import Tippy from "@tippyjs/react/headless"
import { useEffect } from "react"
import { RiArrowDownSLine, RiUserAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { getProducts, setProductLimit, setProductPage } from "~/actions/product.actions"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import PageAndLimitController from "~/components/PageAndLimitController"
import ProductList from "~/components/ProductList"
import SearchFilter from "~/components/SearchFilter"
import routes from "~/config/routes"
import { exportProductsExcel } from "~/services/exportServices"

function Products() {
    const { total, page, limit } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const location = useLocation()
    const query = location.search
    const pageParam = new URLSearchParams(query).get('page')
    const limitParam = new URLSearchParams(query).get('limit')
    const queryParam = new URLSearchParams(query).get('query')

    useEffect(() => {
        dispatch(getProducts(pageParam, limitParam, queryParam))
        if (limitParam) dispatch(setProductLimit(limitParam))
        if (pageParam) dispatch(setProductPage(pageParam))
        // eslint-disable-next-line
    }, [query])

    return (
        <div className="px-2">
            <div className="flex justify-between mb-5 items-center">
                <h3 className="text-xl font-semibold">Products</h3>
                <div className="flex gap-2">
                    <Tippy
                        interactive
                        trigger="click"
                        placement="bottom"
                        render={attr => (
                            <>
                                <ul {...attr} className='bg-white rounded shadow'>
                                    <li className="py-2 px-4 cursor-pointer transition-colors duration-500 hover:bg-gray-bg" onClick={() => exportProductsExcel(query)}>Export products</li>
                                </ul>
                            </>
                        )}
                    >
                        <button className="bg-secondary-bg max-h-[45px] py-1 px-3 sm:py-2 sm:px-5 rounded flex items-center gap-2"><span>Actions</span><RiArrowDownSLine /></button>
                    </Tippy>
                    <Link to={routes.addProduct} className='flex gap-2 items-center font-semibold bg-blue-600 text-white rounded-md p-3'>
                        <RiUserAddLine className="text-base" />
                        <span className="hidden sm:block">Add product</span>
                    </Link>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-end xs:justify-between">
                        <ul className="hidden xs:flex gap-3 lg:gap-10 cursor-pointer">
                            <li>
                                <Link
                                    to={routes.products}
                                    className="py-3 border-b-2 border-blue-600"
                                >
                                    All products
                                </Link>
                            </li>
                        </ul>
                    </div>
                </CardHeader>
                <CardBody>
                    <SearchFilter page={page} limit={limit} />
                    <ProductList />
                    <PageAndLimitController total={total} page={page} limit={limit} />
                </CardBody>
            </Card>
        </div>
    )
}

export default Products