import { Outlet } from 'react-router-dom'
import LinkProvider from './providers/LinkProvider'
import EditModeProvider from './providers/EditModeProvider'
import NavBar from './components/NavBar'
import './App.css'

function App() {
 
  return (
    <>
    <EditModeProvider>
        <LinkProvider>
    <header>
      <NavBar />
    </header>
    <main>
     <Outlet />
     </main>
     </LinkProvider>
     </EditModeProvider>
    </>
  )
}

export default App
