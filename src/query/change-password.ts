import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
import { changePasswordProps } from "../types/change-password";
const create = axios.create();


export async function changePassword(data:changePasswordProps){
    const res = create
    .post(
      serverURL + "/change-password",data
    )
      return res
}