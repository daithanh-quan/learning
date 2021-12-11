import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import CheckOutTemplate from './templates/CheckoutTemplate/CheckOutTemplate'
import Detail from './pages/Detail/Detail';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import InformationUser from './pages/InformationUser/InfomationUser';
import Loading from './components/Loading/Loading';
import LoginRegisterTemplate from './templates/Login_RegisterTemplate/Login_RegisterTemplate';
import DrawerHeader from './components/drawer/Drawer';
export const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Loading />
      <DrawerHeader />
      <Switch>
        <HomeTemplate path='/madanhmuc/:id' exact Component={Category} />
        <LoginRegisterTemplate path='/dangky' exact Component={Register} />
        <LoginRegisterTemplate path='/dangnhap' exact Component={Login} />
        <CheckOutTemplate path='/chitiet/:id' exact Component={Detail} />
        <HomeTemplate path='/thongtintaikhoan' exact Component={InformationUser} />
        <HomeTemplate path='/timkiem/:id' exact Component={Search} />
        <HomeTemplate path='/' exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
