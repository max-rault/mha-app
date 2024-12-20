import { STAFF } from "../constants";
import api from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function fetchStaff(dispatch, route){
  try {
    const response = await api.get(route)
    dispatch({
      type: STAFF.FETCH_STAFF,
      payload: response.data
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}

export async function auth(dispatch, values){
 try {
  const {data} = await api.post('/staff/auth', values)
  if(data.badLevel === true){

    toast.show(`Désolée, vous n'êtes pas autorisé à accéder à cet application !!!\nVeuillez contacter votre résponsable rh`, {type:'warning', duration:null})
  } else{
    await AsyncStorage.setItem('user_id', JSON.stringify(data.user.id))
    dispatch({
      type: STAFF.AUTH,
      payload: {
        changePWd: data.changePWd,
        user: data.user
      }
    })
    return {
      user: data.user,
      changePWd: data.changePWd
    }
  }
 } catch (error) {

    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)

 }

}

export async function updateAccount(dispatch, data){
  try {
    const response = await api.post('/staff/user', data)
    const redirection = true
    dispatch({
      type: STAFF.UPDATE_ACCOUNT,
      payload: response.data?.user
    })
    return {
      redirection: redirection
    }
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}

export async function getUser(id, dispatch){
  try {
    const { data } = await api.get(`/staff/user/${id}`)

    dispatch({
      type: STAFF.GET_USER,
      payload: data.user
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}

/**
 * 
 * @param {function} dispatch 
 * @param {object} membe1r 
 * @returns {array} staffMembers
 */
export async function newStaffMember(dispatch, member){
  try {
    const response = await api.post('/staff/',member)
    toast.show(response.data.message,{type:response.data.type})
    dispatch({
      type: STAFF.NEW_STAFF,
      payload: response.data.member
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}

/**
 * 
 * @param {function} dispatch 
 * @param {integer} id 
 * @param {integer} index 
 */
export async function deleteStaffMember(dispatch, id, index){
  try {
    const response = await api.delete(`/staff/${id}`,{params: {id: id}})
    dispatch({
      type: STAFF.DELETE_STAFF_MEMBER,
      payload: index
    })
  } catch(error){
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}
/**
 * 
 * @param {integer} id 
 * @returns {object} payload 
 */
export async function getStaffMembers(id, date, dispatch){

  // let member = staffList.find((staff)=>(staff.id === id))
  // const tasksFiltered = tasks.filter((task)=>task.staffID === id)

  // if(tasksFiltered.length > 0){

  //   const lobbyLevel = member.levels.filter((task) => task.category === 'lobby')
  //   const kitchenLevel = member.levels.filter((task) => task.category === 'cuisine')
  //   const counterLevel = member.levels.filter((task) => task.category === 'comptoir')
  //   const deliveryLevel = member.levels.filter((task) => task.category === 'livraison')
  //   const cleanLevel = member.levels.filter((task) => task.category === 'nettoyage')

  //   const sumLobby = (lobbyLevel.reduce((a,v) =>  a = a + v?.value , 0 )/lobbyLevel.length)*100
  //   const sumKitchen = (kitchenLevel.reduce((a,v) =>  a = a + v?.value , 0 )/kitchenLevel.length)*100
  //   const sumCounter = (counterLevel.reduce((a,v) =>  a = a + v?.value , 0 )/counterLevel.length)*100
  //   const sumDelivery = (deliveryLevel.reduce((a,v) =>  a = a + v?.value , 0 )/deliveryLevel.length)*100
  //   const sumClean = (cleanLevel.reduce((a,v) =>  a = a + v?.value , 0 )/cleanLevel.length)*100

  //   const colorLobby = chooseColor(sumLobby)
  //   const colorKitchen = chooseColor(sumKitchen)
  //   const colorCounter = chooseColor(sumCounter)
  //   const colorDelivery = chooseColor(sumDelivery)
  //   const colorClean = chooseColor(sumClean)

  //   const lobby = {
  //     name:'lobby',
  //     value: ['lobby',sumLobby],
  //     itemStyle:{
  //       color: colorLobby
  //     }
  //   }

  //   const clean = {
  //     name:'nettoyage',
  //     value: ['nettoyage',sumClean],
  //     itemStyle:{
  //       color: colorClean
  //     }
  //   }

  //   const kitchen = {
  //     name:'cuisine',
  //     value: ["cuisine", sumKitchen],
  //     itemStyle:{
  //       color: colorKitchen
  //     }
  //   }

  //   const counter = {
  //     name:'comptoir',
  //     value: ["comptoir", sumCounter],
  //     itemStyle:{
  //       color: colorCounter
  //     }
  //   }

  //   const delivery = {
  //     name:'livraison',
  //     value: ["livraison", sumDelivery],
  //     itemStyle:{
  //       color: colorDelivery
  //     }
  //   }
  //   catLevels.push(lobby, kitchen, counter, delivery, clean)
  // }

  try {
    const response  = await api.get(`/staff/member/${id}/${date}`)
    dispatch({
      type: STAFF.GET_STAFF_MEMBERS,
      payload: {
        member: response.data.member,
        memberLevel: response.data.memberLevel
      }
    })
  } catch (error) {
    toast.show(`status: ${error.message}\nmessage: ${error.response?.data.message}`, {type:'danger', duration:null})
    console.log('error: ', error)
  }
}