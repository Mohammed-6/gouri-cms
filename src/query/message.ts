import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
import { messageProps } from "../types/message";
const create = axios.create();


export async function listUsers(){
    const res = create
    .post(
      serverURL + "/list-musers", 
      {
        clinicId: localStorage.getItem("clinicId"),
        clinicUser: localStorage.getItem("clinicUser"),
      }
    )
      return res
}

export async function setChat(user:string){
    const res = create
    .post(
      serverURL + "/list-musers", 
      {
        clinicId: localStorage.getItem("clinicId"),
        clinicUser: localStorage.getItem("clinicUser"),
        clientid: user
      }
    )
      return res
}

export async function insertMessage(data:messageProps){
    const res = create
    .post(
      serverURL + "/insert-message", data
    )
      return res
}

export async function getMessage(data:messageProps){
    const res = create
    .post(
      serverURL + "/insert-message", data
    )
      return res
}