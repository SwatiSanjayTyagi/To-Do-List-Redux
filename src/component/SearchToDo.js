import React , { useState } from 'react'
import { connect } from 'react-redux'

function SearchToDo (props) {
    const [inputIt , setInputIt] = useState({ descp:'', mode:false})
    
    function arraydisp(item,index) {
        return (<li  key={index} ><strong>
                {`${item.task} ${item.subtask} ${item.desc} 
                ${new Date(item.dt).toLocaleDateString('en-GB')}
                ${item.tstatus}`}
                </strong>
                </li>)
    }
    function SearchALL() {
        {setInputIt({descp:'', mode:false})}
    }
    
    return(
        <>
            <div className='dispsearch'>
                <div className='Contsearch'>
                    <div className='dispSingleSearch'>
    
                        <input type ='text' value={inputIt.descp} placeholder='Description'
                        onChange={(event)=>{setInputIt({...inputIt,descp: event.target.value})}}/>
                        <input type='button' value='Search' 
                        onClick={(event)=>{setInputIt({...inputIt,mode: true})}}/>
                        {console.log(inputIt,'check')}
                    </div>
                </div>
                <input type='button' value='Search All'
                onClick={(event)=>SearchALL()} />
            </div>
            <p className='App'><strong> To Do List </strong> </p>


        <ol>
            {/* {console.log(statem)} */}
            {console.log(inputIt.descp ,'check descp')}
            {console.log(inputIt.mode ,'check mode')}
            { inputIt.mode?   
            props.tdArray.filter(item=> item.task.includes(inputIt.descp)).map((item, index) => arraydisp(item,index)) 
            :  
            props.tdArray.map((item, index) => arraydisp(item,index))
            }
        </ol>    
        </>
    )
}
const mapStateToProps = (state) => {
    return{
        tdArray: state.toDoArray
    }
}

const mapDispatchToProps =(dispatch) => {
    return{
        findMyItem: (val) => dispatch({type:'FIND_ITEM' , payload: val}) ,
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchToDo)