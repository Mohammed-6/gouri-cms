
import { serverHeader, serverURL } from "../data/stuff";
import {loginProps} from '../types/login'
import axios from "axios";
const create = axios.create();

async function getBranch(clinicid:string){
    // get branch list
    const res = await create
        .post(serverURL + "/list-branch", { clinicId: clinicid });
        return res;
}

async function getProfile(clinicid:string){
      // get profile picture
      const res = await create
        .post(serverURL + "/get-profile", { clinicId: clinicid })
        return res
}

export function loginOnLoad(clientid: string) {
    return {branch: getBranch(clientid), profile: getProfile(clientid)}
}

export async function checkLogin(data:loginProps){
    const check = await create.post(serverURL + '/login', data);
    return check;
}