import { ADD_NEW_ORDER_PRODUCT, SET_PRODUCT_QTY, DELETE_ORDER, GET_ORDER, GET_ORDERS, REMOVE_NEW_ORDER_PRODUCT, SET_ORDER_LIMIT, SET_ORDER_PAGE, SET_ORDER_TOTAL, SET_NEW_ORDER_NOTE, SET_NEW_ORDER_PAYMENT_STATUS, SET_NEW_ORDER_STATUS, SET_NEW_ORDER_CUSTOMER, RESET_NEW_ORDER, SET_ORDER_SIDEBAR_TOTAL } from "~/constants"

const initialState = {
    orders: [],
    order: null,
    newOrder: {
        customer: "",
        note: "",
        cost: "",
        products: [],
        status: 'open',
        deliveryStatus: 'not shipped yet',
        paymentStatus: 'unpaid'
    },
    total: 0,
    sidebarTotal: 0,
    page: 1,
    limit: 20
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS:
            state.orders = action.data.data
            state.total = action.data.total
            break

        case GET_ORDER:
            state.order = action.data
            break

        case DELETE_ORDER:
            state.order = null
            break

        case ADD_NEW_ORDER_PRODUCT:
            if (state.newOrder.products.length) {
                const prodIndex = state.newOrder.products.findIndex(prod => prod.product._id === action.product._id)
                if (prodIndex === -1) {
                    state.newOrder.products = [...state.newOrder.products, { qty: 1, product: action.product }]
                }
                else {
                    state.newOrder.products[prodIndex].qty = +state.newOrder.products[prodIndex].qty + 1
                }
            }
            else {
                state.newOrder.products = [{ qty: 1, product: action.product }]
            }
            break

        case REMOVE_NEW_ORDER_PRODUCT:
            state.newOrder.products.splice(action.productIndex, 1)
            break

        case SET_PRODUCT_QTY:
            state.newOrder.products[action.data.productIndex].qty = +action.data.qty
            break

        case SET_NEW_ORDER_NOTE:
            state.newOrder.note = action.value
            break

        case SET_NEW_ORDER_PAYMENT_STATUS:
            state.newOrder.paymentStatus = action.value
            break

        case SET_NEW_ORDER_STATUS:
            state.newOrder.status = action.value
            break

        case SET_NEW_ORDER_CUSTOMER:
            state.newOrder.customer = action.value
            break

        case RESET_NEW_ORDER:
            state.newOrder = {
                customer: "",
                note: "",
                cost: "",
                products: [],
                status: 'open',
                deliveryStatus: 'not shipped yet',
                paymentStatus: 'unpaid'
            }
            break

        case SET_ORDER_TOTAL:
            state.total = action.total
            break

        case SET_ORDER_SIDEBAR_TOTAL:
            state.sidebarTotal = action.total
            break

        case SET_ORDER_PAGE:
            state.page = action.page
            break

        case SET_ORDER_LIMIT:
            state.limit = action.limit
            break

        default:
            break
    }

    return { ...state }
}

export default orderReducer
