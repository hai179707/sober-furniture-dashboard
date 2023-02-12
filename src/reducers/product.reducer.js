import { ADD_NEW_PRODUCT_IMAGE, ADD_PRODUCT_IMAGE, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS, REMOVE_NEW_PRODUCT_IMAGE, REMOVE_PRODUCT_IMAGE, RESET_NEW_PRODUCT, SET_NEW_PRODUCT_AMOUNT, SET_NEW_PRODUCT_BUY_PRICE, SET_NEW_PRODUCT_DESCRIPTION, SET_PRODUCT_LIMIT, SET_NEW_PRODUCT_NAME, SET_PRODUCT_PAGE, SET_NEW_PRODUCT_PROMOTION_PRICE, SET_NEW_PRODUCT_QUOTE, SET_PRODUCT_TOTAL, SET_NEW_PRODUCT_TYPE, SET_PRODUCT_NAME, SET_PRODUCT_DESCRIPTION, SET_PRODUCT_QUOTE, SET_PRODUCT_TYPE, SET_PRODUCT_BUY_PRICE, SET_PRODUCT_PROMOTION_PRICE, SET_PRODUCT_AMOUNT } from "~/constants"

const initialState = {
    products: [],
    product: null,
    newProduct: {
        name: "",
        description: "",
        quote: "",
        type: "",
        images: [],
        buyPrice: 0,
        promotionPrice: 0,
        amount: 0
    },
    total: 0,
    page: 1,
    limit: 20
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            state.products = action.data.data
            state.total = action.data.total
            break

        case GET_PRODUCT:
            state.product = action.data
            break

        case ADD_PRODUCT_IMAGE:
            state.product.images = [...state.product.images, action.imageUrl]
            break

        case REMOVE_PRODUCT_IMAGE:
            state.product.images.splice(action.imageId, 1)
            break

        case ADD_NEW_PRODUCT_IMAGE:
            state.newProduct.images = [...state.newProduct.images, action.imageUrl]
            break

        case REMOVE_NEW_PRODUCT_IMAGE:
            state.newProduct.images.splice(action.imageId, 1)
            break

        case SET_NEW_PRODUCT_NAME:
            state.newProduct.name = action.value
            break

        case SET_NEW_PRODUCT_DESCRIPTION:
            state.newProduct.description = action.value
            break

        case SET_NEW_PRODUCT_QUOTE:
            state.newProduct.quote = action.value
            break

        case SET_NEW_PRODUCT_TYPE:
            state.newProduct.type = action.value
            break

        case SET_NEW_PRODUCT_BUY_PRICE:
            state.newProduct.buyPrice = action.value
            break

        case SET_NEW_PRODUCT_PROMOTION_PRICE:
            state.newProduct.promotionPrice = action.value
            break

        case SET_NEW_PRODUCT_AMOUNT:
            state.newProduct.amount = action.value
            break

        case SET_PRODUCT_NAME:
            state.product.name = action.value
            break

        case SET_PRODUCT_DESCRIPTION:
            state.product.description = action.value
            break

        case SET_PRODUCT_QUOTE:
            state.product.quote = action.value
            break

        case SET_PRODUCT_TYPE:
            state.product.type = action.value
            break

        case SET_PRODUCT_BUY_PRICE:
            state.product.buyPrice = action.value
            break

        case SET_PRODUCT_PROMOTION_PRICE:
            state.product.promotionPrice = action.value
            break

        case SET_PRODUCT_AMOUNT:
            state.product.amount = action.value
            break

        case RESET_NEW_PRODUCT:
            state.newProduct = {
                name: "",
                description: "",
                quote: "",
                type: "",
                images: [],
                buyPrice: 0,
                promotionPrice: 0,
                amount: 0
            }
            break

        case DELETE_PRODUCT:
            state.product = null
            break

        case SET_PRODUCT_TOTAL:
            state.total = action.total
            break

        case SET_PRODUCT_PAGE:
            state.page = action.page
            break

        case SET_PRODUCT_LIMIT:
            state.limit = action.limit
            break

        default:
            break
    }

    return { ...state }
}

export default productReducer
