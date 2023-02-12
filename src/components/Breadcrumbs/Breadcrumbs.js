import { RiArrowRightSLine } from "react-icons/ri"
import { Link, useLocation } from "react-router-dom"

function Breadcrumbs({ className }) {
    const location = useLocation().pathname
    const breadcrumbItems = location.split('/')
    const [, firstBreadcrumbItem, ...other] = breadcrumbItems

    return (
        <div className={className}>
            <ul className="text-xs flex items-center">
                <li>
                    <Link to={'/' + firstBreadcrumbItem} className='capitalize'>{firstBreadcrumbItem}</Link>
                </li>
                {!!other.length
                    &&
                    other.map((item, index) => (
                        <li key={index} className='flex items-center ml-1 gap-1'>
                            <RiArrowRightSLine />
                            <Link to={'/' + firstBreadcrumbItem + '/' + item} className='capitalize'>{item}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Breadcrumbs