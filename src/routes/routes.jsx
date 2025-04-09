import App from "../App"
import Error from "../pages/Error"
import Form from "../pages/Form"
import List from "../pages/List"

const routes = [
    { 
        path: '/', 
        element: <App />, 
        errorElement: <Error />,
        children: [
            {  path: 'list', element: <List />, errorElement: <Error />},
            {  path: 'form', element: <Form />, errorElement: <Error />}
        ]
    },
]



export default routes
