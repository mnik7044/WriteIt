import { Link } from "react-router-dom";
import { useContext,useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const{setUserInfo, userInfo} = useContext(UserContext)

    useEffect(() => {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 401) {
            setUserInfo(null); // User is not logged in
          } else if (response.ok) {
            response.json().then((userInfo) => {
              setUserInfo(userInfo);
              console.log("Received user info:", userInfo);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }, []);
    

    function logout() {
      fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            setUserInfo(null); // User is logged out
          }
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    }
    

  const username = userInfo?.username
  

  return (
    <header>
      <Link to="/" className="logo">
        WriteIt
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="">
              New Post
            </Link>
            <Link to="" onClick ={logout} className="">
              Logout
            </Link>
          </>
        )} {!username && (
          <>
            <Link to="/login" className="">
              Login
            </Link>
            <Link to="/register" className="">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
  //jhg   v vsz cv  kjgkg hfgfhj  ,jkh
// hgdtdf b hkhj kljk  holy holy  godnik is the supreme of who is the god hs bhaw bhaw
// rdf fcbn  jklh fgj  yuifg fgj    ygjtyufj mgh  
// godnik ghm jhg  fth fgh fgj ghvbsdfuyi h hvkb  
// gvbnbn v n fgh
// godnik mishra
//  hkbkhb godnik mishra
// hkjghjkg
// nikhil mishra 
// godnik
// http://console.aws.com/00

