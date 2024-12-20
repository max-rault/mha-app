import { MQTT } from "../constants";

const initialState ={
    status: undefined,
    id: undefined,
    client: undefined,
}

const mqttReducer = (state = initialState, action) => {
    switch (action.type) {
      case MQTT.CREATE_CLIENT:
        return{
            ...state,
            client: action.payload?.client,
            id: action.payload?.id
        };
     
      case MQTT.STATUS:
        
        return {
          ...state,
          status: action.payload
        }
  
      default:
        return state
    }
}

export default mqttReducer;