import { DELETE_CUSTOMER, GET_CUSTOMER, GET_CUSTOMERS, RESET_NEW_CUSTOMER, SET_CUSTOMER_ADDRESS, SET_CUSTOMER_CITY, SET_CUSTOMER_DISPLAY_NAME, SET_CUSTOMER_EMAIL, SET_CUSTOMER_FULL_NAME, SET_CUSTOMER_LIMIT, SET_CUSTOMER_PAGE, SET_CUSTOMER_PHONE, SET_CUSTOMER_PHOTO_URL, SET_CUSTOMER_PROVINCE, SET_CUSTOMER_TOTAL, SET_EDIT_CUSTOMER_INFO_MODAL_SHOW } from "~/constants"

const initialState = {
    customers: [],
    customer: null,
    newCustomer: {
        displayName: '',
        photoURL: '',
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        province: ''
    },
    total: 0,
    page: 1,
    limit: 20,
    isOpenEditCustomerInfo: false
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            state.customers = action.data.data
            state.total = action.data.total
            break

        case GET_CUSTOMER:
            state.customer = action.data
            break

        case DELETE_CUSTOMER:
            state.customer = null
            break

        case SET_CUSTOMER_DISPLAY_NAME:
            state.newCustomer.displayName = action.value
            break

        case SET_CUSTOMER_PHOTO_URL:
            state.newCustomer.photoURL = action.value
            break

        case SET_CUSTOMER_FULL_NAME:
            state.newCustomer.fullName = action.value
            break

        case SET_CUSTOMER_PHONE:
            state.newCustomer.phone = action.value
            break

        case SET_CUSTOMER_EMAIL:
            state.newCustomer.email = action.value
            break

        case SET_CUSTOMER_ADDRESS:
            state.newCustomer.address = action.value
            break

        case SET_CUSTOMER_CITY:
            state.newCustomer.city = action.value
            break

        case SET_CUSTOMER_PROVINCE:
            state.newCustomer.province = action.value
            break

        case RESET_NEW_CUSTOMER:
            state.newCustomer = {
                displayName: '',
                photoURL: '',
                fullName: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                province: ''
            }
            break

        case SET_CUSTOMER_TOTAL:
            state.total = action.total
            break

        case SET_CUSTOMER_PAGE:
            state.page = action.page
            break

        case SET_CUSTOMER_LIMIT:
            state.limit = action.limit
            break

        case SET_EDIT_CUSTOMER_INFO_MODAL_SHOW:
            state.isOpenEditCustomerInfo = action.isShow
            break

        default:
            break
    }

    return { ...state }
}

export default customerReducer
