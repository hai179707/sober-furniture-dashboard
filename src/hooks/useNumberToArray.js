import { useEffect, useState } from "react"

const useNumberToArray = num => {
    const [arr, setArr] = useState([])

    useEffect(() => {
        const res = []
        for (let i = 1; i <= num; i++) {
            res.push(i)
        }
        setArr(res)
    }, [num])

    return arr
}

export default useNumberToArray