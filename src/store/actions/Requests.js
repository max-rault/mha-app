import { REQUESTS } from "../constants";
import api from "../../utils/api";

/**
 * 
 * @returns {array} requests
 */
export async function fetchRequests(dispatch, filterData){
  try {
    const data = JSON.stringify(filterData)
    const response = await api.get(`/requests/${data}`)
    dispatch({
      type: REQUESTS.FETCH_REQUESTS,
      payload: response.data
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}

/**
 * 
 * @param {integer} id 
 * @returns {object} payload 
 */
export async function getRequest(id, dispatch){

  try {
    const response  = await api.get(`/requests/${id}`)
    dispatch({
      type: REQUESTS.GET_REQUEST,
      payload: response.data
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}