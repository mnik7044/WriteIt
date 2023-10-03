import { useState,useContext } from "react"
import{Navigate} from "react-router-dom"
import { UserContext } from "../UserContext"

export default function LoginPage(){
    const[username,setUsername] =useState('')
    const[password,setPassword] =useState('')
    const[redirect,setRedirect] =useState('')
    const{setUserInfo,userInfo} = useContext(UserContext)
    async function login(ev){
        ev.preventDefault()
       const response = await fetch("http://localhost:4000/login",{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)

            })
            
        }
        else{
            alert("Wrong Credentials")
        }


    }

    if(redirect){
        return < Navigate to = {'/'} />
    }

    return(
        <form  className = "login" onSubmit={login}>
            <h1> LogIn </h1>
            <input type = "text"
                placeholder = "Enter Username"
                value ={username}
                onChange={ ev => setUsername(ev.target.value)}/>
            <input
                type ="password"
                placeholder ="Enter password"
                value={password}
                onChange ={ev => setPassword(ev.target.value)} />
          <button> Login for WriteIt</button>

        </form>
    )
}