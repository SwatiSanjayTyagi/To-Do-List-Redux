import React from 'react';
import './App.css';
import { BrowserRouter , Route, Switch } from 'react-router-dom'
import MainPage from '../src/component/mainPage'
import AddToDoList from '../src/component/AddToDoList'
import SearchToDoList from '../src/component/SearchToDoList'
import SearchToDo from '../src/component/SearchToDo'
import LogIn from '../src/component/logIn'
import LogOut from '../src/component/logOut'
function App() {
  return (
    
    <BrowserRouter>
      <div className='Container'>
      
        <MainPage/>
        <Switch>
          <Route exact path='/logIn' component={LogIn}/>
          <Route exact path='/addToDoList' component={AddToDoList}/>
          <Route exact path='/searchToDoList' component={SearchToDoList}/>
          <Route exact path='/logOut' component={LogOut}/>  
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
