
import { combineReducers } from "redux"

import authReducer from "./auth.reducer"
import mainReducer from "./main.reducer"
import orderReducer from "./order.reducer"
import customerReducer from "./customer.reducer"
import productReducer from "./product.reducer"
import imageReducer from "./image.reducer"
import blogReducer from "./blog.reducer"
import marketingEmailReducer from "./marketingEmail.reducer"

const rootReducer = combineReducers({
    authReducer,
    mainReducer,
    orderReducer,
    customerReducer,
    productReducer,
    imageReducer,
    blogReducer,
    marketingEmailReducer
})

export default rootReducer
