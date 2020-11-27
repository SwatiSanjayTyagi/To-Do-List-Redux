import React , { useEffect } from 'react'
import { connect } from 'react-redux'
import MainPage from './mainPage';
import { Redirect } from 'react-router-dom'

function LogOut(props) {
 
    useEffect(() => {
        props.logoutdone()
      },[]);


    return(
    <div>
      <Redirect to='/logIn'/>
      
    </div>    
    
    
    )
}
const mapStateToProps = (state) => {
    return{
        userData: state.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutdone: () => dispatch({ type: 'LOGOUT'})
    }
}

export  default connect(mapStateToProps,mapDispatchToProps)(LogOut)