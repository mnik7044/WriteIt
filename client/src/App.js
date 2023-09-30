
import './App.css';
//import Post from "./post"
//import Header from "./header"
import {Route,Routes} from "react-router-dom";
import Layout from "./Layout"
import HomePage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element = {<Layout />}>
      <Route index element={ <HomePage /> } />
      <Route path ='/login' element={ <LoginPage /> }/>
      <Route path = "/register" element ={ <RegisterPage />} />

      </Route>

    </Routes>   
  
  );
}

export default App;

