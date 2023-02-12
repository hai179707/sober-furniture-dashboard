import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setNewBlogContent, setNewBlogExcerpt, setNewBlogPath, setNewBlogTitle } from "~/actions/blog.actions"
import Card from "../Card"
import JoditEditor from "jodit-react"
import useStringToPath from "~/hooks/useStringToPath"
import { useEffect } from "react"

function AddBlogPostGeneral() {
    const { newBlog: { title, content, excerpt, path } } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()
    const editor = useRef(null)
    const { path: newPath, setPath: setNewPath } = useStringToPath(path)

    useEffect(() => {
        setNewPath(title)
    }, [title, setNewPath])
    
    useEffect(() => {
        dispatch(setNewBlogPath(newPath))
    }, [newPath, dispatch])

    return (
        <Card>
            <div className="py-2">
                <label className="py-2 block">Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={e => dispatch(setNewBlogTitle(e.target.value))}
                    className='w-full p-3 border border-secondary-bg rounded outline-none'
                    placeholder="Enter blog post title"
                />
            </div>
            <div className='h-[600px] max-h-[600px] flex flex-col py-2'>
                <label className="py-2 block">Content</label>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => dispatch(setNewBlogContent(newContent))}
                />
            </div>
            <div className="py-2">
                <label className="py-2 block">Excerpt</label>
                <textarea
                    type='text'
                    value={excerpt}
                    onChange={e => dispatch(setNewBlogExcerpt(e.target.value))}
                    className='w-full p-3 border border-secondary-bg rounded outline-none resize-none'
                    placeholder="Enter blog post excerpt"
                ></textarea>
            </div>
            <div className="py-2">
                <label className="py-2 block">Path</label>
                <div className="flex items-center">
                    <div className="font-medium">{process.env.REACT_APP_WEBSITE_URL}/blogs/</div>
                    <input
                        type='text'
                        value={newPath}
                        onChange={e => setNewPath(e.target.value)}
                        className='w-full py-1 border-b border-secondary-bg outline-none'
                        placeholder="Enter path"
                    />
                </div>
            </div>
        </Card>
    )
}

export default AddBlogPostGeneral