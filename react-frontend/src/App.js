import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Register from './views/Register';
import Shop from './views/Shop';
import Login from './views/Login';
import Logout from './views/Logout';
import Account from './views/Account';
import MyItems from './views/MyItems';

const App = () => {

  return (
    <>
      <BrowserRouter>
      <Header/>
            <div>
              <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path="/signup" element={<Register />}/>
                <Route path='/shop' element={<Shop/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/account' element={<Account/>}/>
                <Route path='/myitems' element={<MyItems/>}/>
              </Routes>
            </div>
      </BrowserRouter>
    </>
  );
}

export default App;
