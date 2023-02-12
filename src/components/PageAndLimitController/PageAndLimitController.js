import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import useNumberToArray from "~/hooks/useNumberToArray"

function PageAndLimitController({ total, limit, page }) {
    const navigate = useNavigate()
    const pageNumber = Math.ceil(total / limit)
    const pageArr = useNumberToArray(pageNumber)
    
    return (
        <div className="flex mt-3">
            <div className="w-1/2">
                <select className="outline-none" value={limit} onChange={e => navigate(`?page=${page}&limit=${e.target.value}`)}>
                    <option value={5}>Show 5</option>
                    <option value={20}>Show 20</option>
                    <option value={50}>Show 50</option>
                </select>
            </div>
            <div className="w-1/2 flex justify-end gap-4">
                <div className="hidden xs:block">Total: {total}</div>
                <div className="flex items-center">
                    <RiArrowLeftSLine
                        className={page === 1 ? "text-xl text-secondary" : "text-xl cursor-pointer"}
                        onClick={() => page > 1 && navigate(`?page=${+page - 1}&limit=${limit}`)}
                    />
                    {pageArr.map(item => (
                        <div
                            key={item}
                            className={+page === item ? 'px-2 cursor-pointer' : 'px-2 cursor-pointer text-secondary'}
                            onClick={() => navigate(`?page=${item}&limit=${limit}`)}
                        >
                            {item}
                        </div>
                    ))}
                    <RiArrowRightSLine
                        className={page === pageNumber ? "text-xl text-secondary" : "text-xl cursor-pointer"}
                        onClick={() => page < pageNumber && navigate(`?page=${+page + 1}&limit=${limit}`)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PageAndLimitController