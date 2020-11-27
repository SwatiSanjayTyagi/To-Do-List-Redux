import Actions from "../Action/Action"

export default function reducer(state={},action) {
    switch(action.type) {
        case Actions.ADD_ITEM : {
            return {...state, toDoArray: [...state.toDoArray, ...action.payload]}
        }
        case Actions.UPDATE_ITEM : {
            const{ind,obj} = action.payload
            return {...state, toDoArray: [...state.toDoArray.slice(0,ind),obj,
                ...state.toDoArray.slice(ind+1)]}
        }
        case Actions.UPDATE_SINGLE : {
            const{ind,obj} = action.payload
            return {...state, toDoArray: [...state.toDoArray.slice(0,ind),
                {...state.toDoArray[ind],...obj},
                ...state.toDoArray.slice(ind+1)]}
        }
        case Actions.DELETE_ITEM : {
            return {...state, toDoArray: [...state.toDoArray.slice(0,action.payload), 
              ...state.toDoArray.slice(action.payload+1)  ]}
        }
        case Actions.LOGIN: {
            return { ...state, userData: [action.payload] }
        }

        case Actions.LOGOUT: {
            return { ...state, userData: [], toDoArray: [] }
        }

        default: {
            return state
        }
    }
}

