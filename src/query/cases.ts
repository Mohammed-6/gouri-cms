import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
import { searchParameterProps } from "../types/cases";
const create = axios.create();


export async function listDispensePatient(data:searchParameterProps){
    const res = create
    .post(
      serverURL + "/list-patient-case",data
    )
      return res
}