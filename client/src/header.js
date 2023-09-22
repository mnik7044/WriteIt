import {Link} from "react-router-dom"


export default function Header(){
    return(
    <header>
    <Link to="/" className="logo">WriteIt</Link>
    <nav>
    <Link to="/login" className="">Login</Link>
    <Link to="/register" className="">Register</Link>
    </nav>
    </header>);
}