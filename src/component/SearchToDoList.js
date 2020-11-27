import React , { useState } from 'react'
import { connect } from 'react-redux'

function SearchToDoList (props) {
    const [inputIt , setInputIt] = useState({cond:'', comp:'', descp:'', mode:false})
    var todaydt = new Date().toLocaleDateString('en-GB')
    function arraydisp(item,index) {
        return (<li  key={index} ><strong>
                {`${item.task} ${item.subtask} ${item.desc} 
                ${new Date(item.dt).toLocaleDateString('en-GB')}
                ${item.tstatus}`}
                <span> {todaydt <= new Date(item.dt).toLocaleDateString('en-GB')?'': <strong> Task is overdue !!! </strong> }</span>
                </strong>
                </li>)
    }
    function SearchALL() {
        {setInputIt({cond:'', comp:'', descp:'', mode:false})}
    }
    function HandleCombo(para) {
        if (para=='dt')
        { return(
        <select value = {inputIt.comp} 
            onChange={(event)=>{setInputIt({...inputIt,comp: event.target.value})}}>
            <option value=''>Choose...</option>
            <option value='>'>Greater than</option>
            <option value='<'>Less than </option>
            <option value='='>Equal to</option> 
        </select> )
        }
        else
        {return(
        <select value = {inputIt.comp} 
            onChange={(event)=>{setInputIt({...inputIt,comp: event.target.value})}}>
            <option value=''>Choose...</option>
            <option value='='>Equal to</option> 
            {/* <option value='Includes'>Includes</option>  */}
        </select> )
        }
    }
    return(
        <>
            <div className='dispsearch'>
                <div className='Contsearch'>
                    <div className='dispSingleSearch'>
                        <select value = {inputIt.cond} 
                        onChange={(event)=>{setInputIt({...inputIt,cond: event.target.value})}}>
                            <option value=''>Choose...</option>
                            <option value='task'>Task</option>
                            <option value='dt'>Date</option>
                            <option value='tstatus'>Status</option>
                        </select>
                        {HandleCombo(inputIt.cond)}                        
                         
                        
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
            { inputIt.mode?   props.tdArray.filter(item=> {
                const sear = item[inputIt.cond]
                if (inputIt.cond == 'dt')
                {  console.log(new Date(sear).toLocaleDateString('en-GB') , inputIt.descp.trim() , 'Date Check')
                    switch(inputIt.comp){
                    case '>':{ return new Date(sear).toLocaleDateString('en-GB') > inputIt.descp.trim()? true: false}
                    case '<':{ return new Date(sear).toLocaleDateString('en-GB') < inputIt.descp.trim()? true: false}
                    case '=':{ return new Date(sear).toLocaleDateString('en-GB') == inputIt.descp.trim()? true: false}
                    default: return false
                    }
                }
                else
                { console.log( sear, 'item.'+inputIt.cond.trim()+'.includes("'+ inputIt.descp.trim() +'")')
                    switch(inputIt.comp){
                    case '=':{ return sear == inputIt.descp.trim()? true: false}
                    // case 'Includes':{ return 'item.'+inputIt.cond.trim()+'.includes("'+ inputIt.descp.trim() +'")'? true: false}
                    // props.tdArray.filter(item=> item.task.includes(inputIt.descp)).map((item, index) => arraydisp(item,index)) 
                    default: return false
                    }
                }
                
            }).map((item, index) => arraydisp(item,index)) :  
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

export default connect(mapStateToProps,mapDispatchToProps)(SearchToDoList)