import logo from './logo.svg';
import './App.css';
import Form from './Components/Form/Form';
import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './Components/User/login';
import Registr from './Components/User/Registr';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>

          <Route exact path='/'>
            <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
              <Form />
              <List />
            </div>
            </Route >

            <Route exact path='/signin'>
              <Login />
            </Route>

            <Route exact path='/signup'>
              <Registr />
            </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
