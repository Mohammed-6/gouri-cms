import { serverHeader, serverURL } from "../data/stuff";
import {addEditPatientProps, consultationProps, searchProps,searchValueProps, starredPorps, updatePrescriptionProps} from '../types/patient'
import axios from "axios";
const create = axios.create();

export async function searchSuggestions(colte:searchValueProps) {
    const res = await create
        .post(serverURL + "/check-patient-suggestion", colte,)
    return res
}

export async function getPatientList(data:searchProps){
    const res = await create
      .post(
        serverURL + "/get-patient-list",
        { data: data, clinicId: localStorage.getItem("clinicId") }
      )
      return res
}

export async function listDispensePatient(){
    const res = await create
      .post(
        serverURL + "/list-dispense-patient",
        { clinicId: localStorage.getItem("clinicId") }
      )
      return res
}

export async function loadPatientData(rr:unknown){
    const res = create
      .post(
        serverURL + "/check-patient-id-data",
        {
          patientId: rr as number,
          clinicId: localStorage.getItem("clinicId"),
        },
      )
      return res
}

export async function starredVisit(props:starredPorps){
    const res = create
      .post(serverURL + "/change-starred", {
        visitId: props.visitId,
        star: props.star,
        patientId: props.patientId,
        clinicId: localStorage.getItem("clinicId"),
      })
      return res
}

export async function updatePrescriptionModel(dd:updatePrescriptionProps){
    const res = create
      .post(serverURL + "/update-prescription", dd)
      return res      
}

export async function insertPatientVisit(dd:consultationProps){
    const res = create
      .post(serverURL + "/insert-patient-visit", dd)
      return res      
}

export async function insertAudio(formData:any){
    const res = create
      .post(serverURL + "/upload-audio", formData, {headers: {
        "content-type": "multipart/form-data",
    }
    })
    return res
}

export async function uploadAttachment(files:File[]){
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("attachment", file);
    });
    const res = create
      .post(serverURL + "/upload", formData, {headers: {
        "content-type": "multipart/form-data",
    }
    })
    return res
}

export async function getPatientData(){
    const res = create
    .post(serverURL + "/get-patient-data", { 
        clinicId: localStorage.getItem("clinicId") 
    })
    return res
}

export async function addPatient(colte:addEditPatientProps){
    const res = create
    .post(serverURL + "/add-patient", colte)
    return res
}

export async function editPatient(patientid:string|number){
    const res = create
    .post(serverURL + "/get-patient", {
        clinicId: localStorage.getItem("clinicId"),
        userId: patientid,
    })
    return res
}

export async function updatePatient(colte:addEditPatientProps){
    const res = create
    .post(serverURL + "/edit-patient", colte)
    return res
}