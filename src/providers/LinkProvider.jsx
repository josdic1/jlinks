import { useState, useEffect } from "react"
import LinkContext from "../context/LinkContext"

function LinkProvider({children}) {

    const [ links, setLinks] = useState([])
    const [ selectedLink, setSelectedLink] = useState({
        id: '',
        title: '',
        type: '',
        description: '',
        paid: '',
        starred: ''

    })

    useEffect(() => {
        fetchLinks()
    },[])

    async function fetchLinks() {
        try {
            const r = await fetch(`http://localhost:3000/links`)
            const data = await r.json()
            setLinks(data)
        }catch (error) {console.error("❌ Caught error:", error);}
    }

    return (
    <>
    <LinkContext.Provider value={{
        links
    }}>
        {children}
    </LinkContext.Provider>
    </>
    )}

    export default LinkProvider

