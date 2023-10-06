
import './App.css';
//import Post from "./post"
//import Header from "./header"
import {Route,Routes} from "react-router-dom";
import Layout from "./Layout"
import HomePage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import {UserContextProvider} from "./UserContext"
import Post from './Pages/CreatePost';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element = {<Layout />}>
      <Route index element={ <HomePage /> } />
      <Route path ='/login' element={ <LoginPage /> }/>
      <Route path = "/register" element ={ <RegisterPage />} />
      <Route path ="/create" element ={<Post/>} />
      </Route>

    </Routes>   
    </UserContextProvider>
  
  );
}

export default App;

