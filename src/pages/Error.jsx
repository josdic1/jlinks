import { useRouteError } from "react-router-dom"
import NavBar from "../components/NavBar"

function Error() {

const error = useRouteError()

return (
<>
<header>
</header>
<main>
    <h1>Error!</h1>
    <h2>status: {error?.status}</h2>
    <h2>message: {error?.message}</h2>
    <h2>statusText: {error?.statusText}</h2>
</main>
</>
)}

export default Error
