import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

function BlogPostItem({ data }) {
    return (
        <div className="flex py-3 border-b border-gray-bg">
                <Link to={'/website/blogs/' + data._id} className="px-1 w-2/3 text-blue-600 flex gap-2">
                    <div><img src={data.featuredImage} alt='product' width={48} className='min-w-[48px] rounded' /></div>
                    <span>{data.title}</span>
                </Link>
                <div className="px-1 w-1/3 sm:1/12 text-right sm:text-center uppercase">{data.author.fullName}</div>
                <div className="px-1 w-1/4 text-center hidden sm:block">{data.updatedAt.split('T')[0].split('-').join('/')} {data.updatedAt.split('T')[1].split('.')[0]}</div>
        </div>
    )
}

BlogPostItem.propTypes = {
    data: PropTypes.object.isRequired
}

export default BlogPostItem