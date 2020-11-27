// form for capturing the login credentials
import React from 'react'
import {useForm} from  'react-hook-form' // for using form validation
import {connect} from 'react-redux' // for connecting to redux store

// functional components for using hooks 
function LogIn(props) {
    // for handling form submits
    const {register,errors,handleSubmit} = useForm() 

    const onSubmit = data => {
        // for inserting user data into userData array
        props.verify(data)
        // for redirect the page to todolist
        props.history.push('/AddToDoList')
        
        //data.preventDefault()
        console.log(data);
    }

    return(
        <div className='LoginContainer'>
            <div className='Loginhead'>
                <form onSubmit={handleSubmit(onSubmit) }>
                    My To Do List 
                    <p className='dispLogindata'>
                        User name:
                        <input type='text' name='userName' placeholder='User Name'
                        ref={register({required: {value: true, message: 'User Name is required' }})}/> 
                    </p>
                    {/* <p className='dispLoginblank'> */}
                        {errors.userName && ( <span className='AppError'>{errors.userName.message}</span> )}
                    {/* </p> */}
                    
                    <p className='dispLogindata'>
                        Password: 
                        <input type='password' name='pass' placeholder='Password'
                        ref={register({required: {value: true, message: 'Password is required' }})} 
                        />
                    </p>
                    {/* <p className='dispLoginblank'> */}
                        {errors.pass && ( <span className='AppError' >{errors.pass.message}</span> )}
                    {/* </p> */}
                    <br/>
                    <button type='Submit'>Submit</button>
                                           

                </form>
                
            </div>
        </div>
        
    )
}


const mapStateToProps = (state) => {
    return {
        tdArray: state.toDoArray,
        userData: state.userData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verify: (val) => dispatch({ type: 'LOGIN', payload: val })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
