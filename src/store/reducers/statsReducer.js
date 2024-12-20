import { STATS } from "../constants";

const initialState ={
    contractStats: [],
    levelStats: {},
    turnOverStats: {},
    memberRequest: undefined,
    noData: true,
}

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
      case STATS.FETCH_STATS:
        var { levelStats, contractStats, turnOverStats } = action.payload
        return{
            ...state,
            contractStats: contractStats,
            levelStats: levelStats,
            turnOverStats: turnOverStats
        };
      default:
        return state
    }
}

export default statsReducer;