export default function LoginPage(){
    return (

        <div> 
            <form className = "login" >
                <h1> Login</h1>
                <input type = "text" placeholder = "Enter your Username" />
                <input type ="password" placeholder ="Enter your password" />
                <button> LogIn To WriteIt</button>

            </form>
        </div>
    )
}