import { STATS } from "../constants";
import api from "../../utils/api";

/**
 * 
 * @returns {array} requests
 */
export async function fetchStats(dispatch){
  try {
    const response = await api.get(`/stats/`)
    const data = response.data
    dispatch({
      type: STATS.FETCH_STATS,
      payload: {
        // levelStats: data.levelStats,
        contractStats: data.contractStats,
        turnOverStats: data.turnOverStats,
        levelStats: data.levelsStats
      }
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}