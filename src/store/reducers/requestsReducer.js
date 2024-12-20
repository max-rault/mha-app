import { REQUESTS } from "../constants";

const initialState ={
    requests: [],
    memberRequest: undefined,
    noData: true,
}

const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUESTS.FETCH_REQUESTS:
        return{
            ...state,
            requests: action.payload
        };
     
      case REQUESTS.GET_REQUEST:
        
        return {
          ...state,
          member: action.payload.member,
          memberLevel: action.payload.memberLevel
        }
  
      default:
        return state
    }
}

export default requestsReducer;