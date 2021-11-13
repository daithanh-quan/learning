import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Detail from './pages/Detail/Detail';
export const history = createBrowserHistory()
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path='/madanhmuc/:id' exact Component={Category} />
        <HomeTemplate path='/chitiet/:id' exact Component={Detail} />
        <HomeTemplate path='/timkiem/:id' exact Component={Search} />
        <HomeTemplate path='/' exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
