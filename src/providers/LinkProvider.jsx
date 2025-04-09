import { useState, useEffect, useReducer } from "react"
import LinkContext from "../context/LinkContext"

function LinkProvider({children}) {

   
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
    
    const init = {
        links: [], 
    }


    const [state, dispatch] = useReducer(reducer, init)

    function reducer(state, action) {
        let updatedList;
        switch (action.type) {
          case 'SET_LINKS':
            return { ...state, links: action.payload };
      
          case 'ADD_LINK':
            updatedList = [...state.links, action.payload];
            return { ...state, links: updatedList };
      
          case 'DELETE_LINK':
            updatedList = state.links.filter(link => link.id !== action.payload);
            return { ...state, links: updatedList };
      
          case 'UPDATE_LINK':
            updatedList = state.links.map(link =>
              link.id === action.payload.id ? action.payload : link
            );
            return { ...state, links: updatedList };
            case 'UPDATE_STAR':
                updatedList = state.links.map(link =>
                  link.id === action.payload.id ? action.payload : link
                )
                return { ...state, links: updatedList }
          default:
            return state;
        }
      }
      


    async function fetchLinks() {
        try {
            const r = await fetch(`http://localhost:3001/links`)
            if(!r.ok){
                throw new Error("💥 Error");
            }
            const data = await r.json()
            dispatch({ type: 'SET_LINKS', payload: data })
        }catch (error) {console.error("❌ Caught error:", error);}
    }

    async function handleAdd(obj) {
        try {
            const r = await fetch (`http://localhost:3001/links`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(obj)
            })
            if(!r.ok) {
                throw new Error("💥 Error");
            }
            const data = await r.json()
            dispatch({ type: 'ADD_LINK', payload: data })
        }catch (error) {console.error("❌ Caught error:", error);}
    }

    async function handleDelete(id) {
        try {
            const r = await fetch(`http://localhost:3001/links/${id}`, {
                method: 'DELETE',
            })
            if(!r.ok) {
                throw new Error("💥 Error");
            }
            dispatch({ type: 'DELETE_LINK', payload: id })
        }catch (error) {console.error("❌ Caught error:", error);}
    }

    async function handleUpdate(obj) {
        try {
            const r = await fetch (`http://localhost:3001/links/${obj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(obj)
            })
            if(!r.ok) {
                throw new Error("💥 Error");
            }
            const data = await r.json()
            dispatch({ type: 'UPDATE_LINK', payload: data })
        }catch (error) {console.error("❌ Caught error:", error);}
    }

    async function handleStar(obj) {
        try {
            const r = await fetch (`http://localhost:3001/links/${obj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(obj)
            })
            if(!r.ok) {
                throw new Error("💥 Error");
            }
            const data = await r.json()
            console.log("✅ Links loaded:", data)
            dispatch({ type: 'UPDATE_STAR', payload: data })
        }catch (error) {console.error("❌ Caught error:", error);}
    }


    return (
    <>
    <LinkContext.Provider value={{
        links: state.links, setSelectedLink, selectedLink, handleAdd, handleUpdate, handleDelete, handleStar
    }}>
        {children}
    </LinkContext.Provider>
    </>
    )}

    export default LinkProvider

