
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { getImages, setImageLimit, setImagePage } from "~/actions/image.actions"
import ImagesPageContent from "~/components/ImagesPageContent"
import ImagesPageHeader from "~/components/ImagesPageHeader"

function Images() {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = location.search
    const searchParam = new URLSearchParams(query).get('query')
    const pageParam = new URLSearchParams(query).get('page')
    const limitParam = new URLSearchParams(query).get('limit')

    useEffect(() => {
        dispatch(getImages(pageParam || 1, limitParam || 20, searchParam || ''))
        dispatch(setImagePage(pageParam || 1))
        dispatch(setImageLimit(limitParam || 20))
        // eslint-disable-next-line
    }, [pageParam, limitParam, searchParam])
    return (
        <div className="px-2">
            <ImagesPageHeader />
            <ImagesPageContent />
        </div>
    )
}

export default Images