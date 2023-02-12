import { useEffect } from "react"
import { RiUserAddLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { getBlogPosts, setBlogLimit, setBlogPage } from "~/actions/blog.actions"
import BlogPostList from "~/components/BlogPostList"
import Card from "~/components/Card"
import CardBody from "~/components/CardBody"
import CardHeader from "~/components/CardHeader"
import PageAndLimitController from "~/components/PageAndLimitController"
import SearchFilter from "~/components/SearchFilter"
import routes from "~/config/routes"

function Blogs() {
    const { total, page, limit } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()
    const location = useLocation()
    const query = location.search
    const searchParam = new URLSearchParams(query).get('query')
    const pageParam = new URLSearchParams(query).get('page')
    const limitParam = new URLSearchParams(query).get('limit')
    const visibilityParam = new URLSearchParams(query).get('visibility')
    const tab = new URLSearchParams(query).get('tab')

    useEffect(() => {
        dispatch(getBlogPosts(pageParam || 1, limitParam || 20, searchParam || '', visibilityParam || ''))
        dispatch(setBlogPage(pageParam || 1))
        dispatch(setBlogLimit(limitParam || 20))
        // eslint-disable-next-line
    }, [pageParam, limitParam, searchParam, visibilityParam])

    return (
        <div className="px-2">
            <div className="flex justify-between mb-5 items-center">
                <h3 className="text-xl font-semibold">All blog posts</h3>
                <Link to={routes.addBlogPost} className='flex gap-2 items-center font-semibold bg-blue-600 text-white rounded-md p-3'>
                    <RiUserAddLine className="text-base" />
                    <span className="hidden sm:block">Add post</span>
                </Link>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex justify-end xs:justify-between">
                        <ul className="flex gap-3 lg:gap-10 cursor-pointer">
                            <li>
                                <Link
                                    to={routes.blogPosts}
                                    className={!tab ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    All blog posts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`?page=${page}&limit=${limit}&visibility=visible&tab=visible`}
                                    className={tab === 'visible' ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    Visible
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`?page=${page}&limit=${limit}&visibility=hidden&tab=hidden`}
                                    className={tab === 'hidden' ? "py-3 border-b-2 border-blue-600" : "py-3 border-b-2 border-transparent hover:border-secondary-bg"}
                                >
                                    Hidden
                                </Link>
                            </li>
                        </ul>
                    </div>
                </CardHeader>
                <CardBody>
                    <SearchFilter page={page} limit={limit} />
                    <BlogPostList />
                    <PageAndLimitController total={total} page={page} limit={limit} />
                </CardBody>
            </Card>
        </div>
    )
}

export default Blogs