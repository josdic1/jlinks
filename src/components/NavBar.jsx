import { NavLink } from "react-router-dom"

function NavBar() {

return (
<>
<nav>
  <h3>NavBar Loaded</h3>
  <NavLink to='/'>Home</NavLink>
  <NavLink to='/list'>List</NavLink>
</nav>
</>
)}

export default NavBar
