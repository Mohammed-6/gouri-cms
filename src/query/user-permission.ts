import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
import { updateUserTpeParamsProps } from "../types/change-password";
const create = axios.create();


export async function listUsers(){
    const res = create
    .post(
      serverURL + "/list-users",
      {
        clinicId: localStorage.getItem("clinicId"),
      }
    )
      return res
}

export async function getUserType(id:string|number){
    const res = create
    .post(
      serverURL + "/get-susertype",
      {
        clinicId: localStorage.getItem("clinicId"),
        id: id,
      }
    )
      return res
}

export async function updateUserType(data:updateUserTpeParamsProps){
    const res = create
    .post(
      serverURL + "/update-usertype",data
    )
      return res
}