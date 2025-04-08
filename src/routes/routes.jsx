import App from "../App"
import Error from "../pages/Error"
import List from "../pages/List"

const routes = [
    { 
        path: '/', 
        element: <App />, 
        errorElement: <Error />,
        children: [
            {  path: 'list', element: <List />, errorElement: <Error />}
        ]
    },
]



export default routes
