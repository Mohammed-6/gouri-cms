import { serverHeader, serverURL } from "../data/stuff";
import {addEditUserProps} from '../types/su-user'
import axios from "axios";
const create = axios.create();

export async function listAdminUser() {
    const res = create
      .post(
        serverURL + "/list-susers",
        {
          clinicId: localStorage.getItem("clinicId"),
        },
      )
      return res
}

export async function uploadSingle(formdata:any){
    let res = create.post(serverURL + '/upload-single', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
    return res;
}

export async function createAdmin(data:addEditUserProps) {
    let res = create.post(serverURL+'/add-user', data)
    return res;
}

export async function editAdmin(id:string) {
    let res = create.post(serverURL+'/get-edit-suser', {clinicId: localStorage.getItem("clinicId"), userId: id})
    return res;
}

export async function updateAdmin(data:addEditUserProps) {
    let res = create.post(serverURL+'/update-suser', data)
    return res;
}

export async function deleteAdmin(id:string) {
    let res = create.post(serverURL+'/delete-susers', {
        clinicId: localStorage.getItem("clinicId"),
        clinic_Id: id,
      },)
    return res;
}