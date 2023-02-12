import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setProductDescription, setProductName, setProductQuote, setProductType } from "~/actions/product.actions"
import { getProductTypes } from "~/services/productServices"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function ProductPageGeneral() {
    const { product } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const [productTypes, setProductTypes] = useState([])
    const [productTypeId, setProductTypeId] = useState(product.type._id)

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getProductTypes()
            if (res) {
                setProductTypes(res)
            }
        }
        fetchApi()
    }, [])

    useEffect(() => {
        if (productTypes.length) {
            const currType = productTypes.find(type => productTypeId === type._id)
            dispatch(setProductType(currType))
        }
        // eslint-disable-next-line
    }, [productTypeId, productTypes])

    return (
        <Card>
            <CardHeader>
                <h4 className="font-semibold">General Information</h4>
            </CardHeader>
            <CardBody>
                <div className="mb-4 flex flex-wrap gap-y-4">
                    <div className="w-full sm:w-1/2 sm:pr-2">
                        <label className="block font-medium mb-2">Name</label>
                        <input
                            type='text'
                            placeholder="Product name"
                            value={product.name}
                            onChange={e => dispatch(setProductName(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-2">
                        <label className="block font-medium mb-2">Type</label>
                        <select
                            value={productTypeId}
                            onChange={e => setProductTypeId(e.target.value)}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        >
                            {productTypes.map(productType => (
                                <option value={productType._id} key={productType._id}>{productType.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-2">Description</label>
                    <textarea
                        placeholder="Product description"
                        value={product.description}
                        onChange={e => dispatch(setProductDescription(e.target.value))}
                        className='border border-gray-bg outline-none p-2 w-full rounded resize-none min-h-[300px] sm:min-h-[500px]'
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium mb-2">Quote</label>
                    <textarea
                        placeholder="Product description"
                        value={product.quote}
                        onChange={e => dispatch(setProductQuote(e.target.value))}
                        className='border border-gray-bg outline-none p-2 w-full rounded resize-none'
                    ></textarea>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProductPageGeneral