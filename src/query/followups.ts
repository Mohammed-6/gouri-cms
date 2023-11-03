import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
import { searchParameterProps } from "../types/followups";
const create = axios.create();


export async function listFollowUpsCases(data:searchParameterProps){
    const res = create
    .post(
      serverURL + "/list-followup-case",data
    )
      return res
}