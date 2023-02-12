import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SearchForm from "~/components/SearchForm"
import useDebounce from "~/hooks/useDebounce"

function SearchFilter({ page, limit }) {
    const navigate = useNavigate()
    const location = useLocation()
    const query = location.search
    const searhQuery = new URLSearchParams(query).get('query')
    const [searchValue, setSearchValue] = useState(searhQuery || '')

    const debounceSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if (searhQuery) {
            navigate(query.split('&query=')[0] + '&query=' + debounceSearchValue)
        }
        else {
            navigate(`?page=${page}&limit=${limit}&query=${debounceSearchValue}`)
        }
        // eslint-disable-next-line
    }, [debounceSearchValue])

    return (
        <div>
            <SearchForm value={searchValue} onChange={e => setSearchValue(e.target.value)} onClear={() => setSearchValue('')} onSubmit={e => e.preventDefault()} />
        </div>
    )
}

export default SearchFilter