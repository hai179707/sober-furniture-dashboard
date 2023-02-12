import { useSelector } from "react-redux"
import Card from "../Card"

function BlockPostAuthor() {
    const { blogPost: { author } } = useSelector(state => state.blogReducer)

    return (
        <Card>
            <p>Author: <span className="font-semibold">{author.displayName} (You)</span></p>
        </Card>
    )
}

export default BlockPostAuthor