import React , { useState , useEffect } from 'react'
import { connect } from 'react-redux' // to be able to connect to store
import {useForm} from  'react-hook-form'

function AddToDoList (props) {
    const [inputItem , setInputItem] = useState({task:'', subtask:'',
                                                 desc:'', dt:'', 
                                                 arrcheck: false, tstatus:'' })
    // flag to check add / update
    const [updateIndex, setUpdateIndex] = useState(-1)
    // to check authentification , useEffect used as componenetdidmount    
    useEffect(() => {
        if (!props.isAuth ) 
        {
            props.history.push('/logIn')
        }
    },[] )
    //for form validation
    const {register,errors,handleSubmit} = useForm()
    // to handleon submit
    const onSubmit = submit => {
        console.log(submit,'submit check')
        if (updateIndex== -1 ) 
        { // to add the data in toDoArray 
            props.addMyList([submit])
        }
        else 
        { // for updating the data in toDoArray
            props.updateMyList({ind: updateIndex,obj:submit })
            setUpdateIndex(-1) // resetting the flag for add option
        }
        handleclear() // clearing the screen
    }
    // todays date in dd/mm/yyyy format     
    var todaydt = new Date().toLocaleDateString('en-GB')
    // onclick event of the checkbox in the listing
    // incase the checkbox is clicked tstatus gets updated to Complete and vice versa
    var Handleclick=(ind)=>{
        var arrClick = props.tdArray[ind]
        var newStatus 
            if (arrClick.tstatus=='Complete' & arrClick.arrcheck==true )
                {newStatus='Incomplete'}
            else
                {newStatus='Complete'}
            var newObj = {arrcheck:!arrClick.arrcheck,tstatus:newStatus}
            // to update just the tstatus and arrcheck       
            props.updateMyItem({ind: ind,obj: newObj })
    }
    // for clearing all the text boxes
    var handleclear=()=> {
        console.log('handle clear')

        setInputItem({task:'',
            subtask:'',
            desc:'',
            dt:'', 
            arrcheck:'',
            tstatus:''}) 
    }
    // for resetting the data from the list into the textboxes for updation
    var HandleUpdate= (ind) => {
        var findItem = props.tdArray[ind]
        setInputItem(
            {task: findItem.task,
            subtask: findItem.subtask,
            desc: findItem.desc,
            dt: findItem.dt, 
            arrcheck: findItem.arrcheck,
            tstatus: findItem.tstatus
           }
        )
        setUpdateIndex(ind) // resetting the add / update flag
    }

    return(
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='disptask'>
                <strong>Task</strong>
                {/* onChange is needed for fetching the data */}
                <input type='text' value={inputItem.task} name="task" placeholder='Task'
                onChange={(event)=>{setInputItem({...inputItem,task: event.target.value})}} 
                ref={register({required: {value: true, message: 'Task is required' }})} autoFocus/> 
                <strong>Sub Task</strong>
                <input type = 'text' value = {inputItem.subtask} name="subtask" placeholder ='SubTask' 
                ref={register} onChange={(event)=>{setInputItem({...inputItem,subtask: event.target.value})}}/>  
            </div>
                {errors.task && (
                    <span className='AppError'>{errors.task.message.trim()}</span>
                )}  
            <div className='disptextarea'>
                <strong>Description</strong>
                <textarea  name='desc' value = {inputItem.desc} rows="5" cols="70" 
                placeholder='Description' ref={register} 
                onChange={(event)=>{setInputItem({...inputItem,desc: event.target.value})}}/> 
            </div>
            
            <div className='dispdate' > 
                <strong>Date</strong>
                <input type = 'date' name='dt' value = {inputItem.dt} 
                ref={register({required: {value: true, message: 'Date is required' }})}
                onChange={(event)=>{setInputItem({...inputItem,dt: event.target.value})}}/> 
                <strong>Status</strong>
                {/* In case of an add need to have just incomplete in the dropdown */}
                {updateIndex == -1 ? // checking for add
                <select name='tstatus' value = {inputItem.tstatus} 
                ref={register({required: {value: true, message: 'Status is required' }})}
                onChange={(event)=>{setInputItem({...inputItem,tstatus: event.target.value,arrcheck: false })}}>  
                    <option value=''>Choose...</option>
                    <option value='Incomplete'>Incomplete</option>
                </select>: // in case of an update
                <select value = {inputItem.tstatus}  name='tstatus' 
                ref={register({required: {value: true, message: 'Status is required' }})}
                onChange={(event)=>{setInputItem({...inputItem,tstatus: event.target.value,arrcheck: false })}}>  
                    <option value=''>Choose...</option>
                    <option value='Incomplete'>Incomplete</option>
                   <option value='Complete'>Completed</option>
                </select>}
                <p className='disptaskerror'>
                {errors.task && (
                    <span className='AppError'>{errors.dt.message.trim()}</span>
                )}
                {errors.task && (
                    <span className='AppError'>{errors.tstatus.message.trim()}</span>
                )}
                </p>
            </div>
            {/* toggel the button value based in add / update  */}
            <p className='dispbutton'>
                <input type = 'submit'  value ={updateIndex==-1 ? "Add Task" : "Update Task" }  />
            </p>
            </form>
         
    
               <ol>
                {props.tdArray.map((item, index) => (
                    <li  key={index} ><strong>
                        <input type="checkbox" id={index} name={index}
                        checked={item.arrcheck} onChange = {()=>{Handleclick(index)}}/>
                        <span className={item.arrcheck? 'truechk': '' } >
                            
                            <span> {todaydt <= new Date(item.dt).toLocaleDateString('en-GB')?'': <strong> Task is overdue !!! </strong> }</span>
                                {`${item.task} ${item.subtask} ${item.desc} 
                                ${new Date(item.dt).toLocaleDateString('en-GB')}
                                ${item.tstatus}`}
                        </span>
                        <input type="button" value="Update" 
                        onClick = {()=>{HandleUpdate(index)}} />
                        <input type="button" value="Delete" 
                        onClick = {()=>{props.deleteMyList(index)}} />
                      
                        </strong>
                    </li>
                        ))}
                </ol>
            
    </div>
    )
}

const mapStateToProps = (state) => {
    return{
        tdArray: state.toDoArray,
        userData: state.userData,
        isAuth : state.userData.length > 0 ? true: false
    }
}

const mapDispatchToProps =(dispatch) => {
    return{
        addMyList: (val) => dispatch({type:'ADD_ITEM' , payload: val}) ,
        updateMyList: (valu) => dispatch({type:'UPDATE_ITEM' , payload: valu}) ,
        updateMyItem: (val) => dispatch({type:'UPDATE_SINGLE' , payload:val}),
        deleteMyList: (value) => dispatch({type:'DELETE_ITEM' , payload: value})
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddToDoList)
