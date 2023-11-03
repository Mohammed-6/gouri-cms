import { serverHeader, serverURL } from "../data/stuff";
import { editDispense } from "../types/dispense";
import {loginProps} from '../types/login'
import axios from "axios";
const create = axios.create();

export async function listDispensePatient(){
    const res = create
    .post(
      serverURL + "/list-dispense-patient",
      {
        clinicId: localStorage.getItem("clinicId"),
      },
    )
      return res
}

export async function getPatientDispense(visitid:number|string){
    const res = create
    .post(
      serverURL + "/check-patient-id-dispenser",
      {
        clinicId: localStorage.getItem("clinicId"),
        visitId: visitid,
      },
    )
      return res
}

export async function dispensePatientVisit(collectdata:editDispense){
    const res = create
    .post(
      serverURL + "/dispense-patient-visit",collectdata
    )
      return res
}