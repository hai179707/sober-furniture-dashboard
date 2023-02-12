import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNewProductDescription, setNewProductName, setNewProductQuote, setNewProductType } from "~/actions/product.actions"
import { getProductTypes } from "~/services/productServices"
import Card from "../Card"
import CardBody from "../CardBody"
import CardHeader from "../CardHeader"

function AddProductGeneral() {
    const { newProduct } = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const [productTypes, setProductTypes] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getProductTypes()
            if (res) {
                setProductTypes(res)
            }
        }
        fetchApi()
    }, [])

    return (
        <Card>
            <CardHeader>
                <h4 className="font-semibold">General Information</h4>
            </CardHeader>
            <CardBody>
                <div className="mb-4 flex flex-wrap gap-y-4">
                    <div className="w-full sm:w-1/2 sm:pr-2">
                        <label className="block font-medium mb-2">Name*</label>
                        <input
                            type='text'
                            placeholder="Product name"
                            value={newProduct.name}
                            onChange={e => dispatch(setNewProductName(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        />
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-2">
                        <label className="block font-medium mb-2">Type*</label>
                        <select
                            value={newProduct.type}
                            onChange={e => dispatch(setNewProductType(e.target.value))}
                            className='border border-gray-bg outline-none p-2 w-full rounded'
                        >
                            <option value=''>Choose product type</option>
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
                        value={newProduct.description}
                        onChange={e => dispatch(setNewProductDescription(e.target.value))}
                        className='border border-gray-bg outline-none p-2 w-full rounded resize-none min-h-[300px] sm:min-h-[500px]'
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium mb-2">Quote</label>
                    <textarea
                        placeholder="Product description"
                        value={newProduct.quote}
                        onChange={e => dispatch(setNewProductQuote(e.target.value))}
                        className='border border-gray-bg outline-none p-2 w-full rounded resize-none'
                    ></textarea>
                </div>
            </CardBody>
        </Card>
    )
}

export default AddProductGeneral