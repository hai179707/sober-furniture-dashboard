import { GET_MARKETING_EMAILS, SET_MARKETING_EMAIL_LIMIT, SET_MARKETING_EMAIL_PAGE, SET_MARKETING_EMAIL_TOTAL } from "~/constants"

const initialState = {
    marketingEmails: [],
    total: 0,
    page: 1,
    limit: 20
}

const marketingEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKETING_EMAILS:
            state.marketingEmails = action.data.data
            state.total = action.data.total
            break

        case SET_MARKETING_EMAIL_TOTAL:
            state.total = action.total
            break

        case SET_MARKETING_EMAIL_PAGE:
            state.page = action.page
            break

        case SET_MARKETING_EMAIL_LIMIT:
            state.limit = action.limit
            break

        default:
            break
    }

    return { ...state }
}

export default marketingEmailReducer
