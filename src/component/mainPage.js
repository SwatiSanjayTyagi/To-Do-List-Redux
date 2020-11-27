// this file does not have any routing process its stationary
import React  from 'react'
import {Link} from 'react-router-dom' // adding Link
import { connect } from 'react-redux' // to be able to connect to store

function MainPage(props) {
    
    return(
        <div className='head'>
            <h1> My To Do List</h1>
            {!props.chkLogin?   
            <Link className='createSpace' to ='/logIn'>Login</Link>
            :
            <div>
            <Link className='createSpace' to ='/addToDoList'>Add To Do List</Link>
            <Link className='createSpace' to ='/searchToDoList'>Search To Do List</Link>
            <Link className='createSpace' to ='/logout'>LogOut</Link>
    
            {props.userData.map((item)=> 
            <style className='logname'>Hello :  {item.userName}</style> )}
            </div>
             }        

        </div>
        
    )
    
}
const mapStateToProps = (state) => {
    return{
        userData: state.userData,
        chkLogin : state.userData.length > 0 ? true : false
    }
}

export default connect(mapStateToProps,null)(MainPage)

