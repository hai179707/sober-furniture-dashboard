
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { getMarketingEmails, setMarketingEmailLimit, setMarketingEmailPage } from "~/actions/marketingEmail.actions"
import MarketingEmailsPageContent from "~/components/MarketingEmailsPageContent"
import MarketingEmailsPageHeader from "~/components/MarketingEmailsPageHeader"

function MarketingEmails() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = location.search
    const searchParam = new URLSearchParams(query).get('query')
    const pageParam = new URLSearchParams(query).get('page')
    const limitParam = new URLSearchParams(query).get('limit')

    useEffect(() => {
        dispatch(getMarketingEmails(pageParam || 1, limitParam || 20, searchParam || ''))
        dispatch(setMarketingEmailPage(pageParam || 1))
        dispatch(setMarketingEmailLimit(limitParam || 20))
        // eslint-disable-next-line
    }, [pageParam, limitParam, searchParam])
    return (
        <div className="px-2">
            <MarketingEmailsPageHeader />
            <MarketingEmailsPageContent />
        </div>
    )
}

export default MarketingEmails