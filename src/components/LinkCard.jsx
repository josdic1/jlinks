import { useParams } from "react-router-dom"

function LinkCard({ link }) {

    const { id } = useParams()
    

    return (
    <>
        <header>

        </header>
        <main>
            <h3>{link.title}</h3>
        </main>

    </>
    )}

    export default LinkCard

