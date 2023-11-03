import { listDispensePatient } from "../query/patient"
import {attachmentProps} from './basic'

export type patientProps = {
    dateTime:string,
    emergencyContact:{
        relation:string, 
        aadharNo:string, 
        firstname:string, 
        surname:string, 
        phone:string,
    }
    personalDetails:{
        aadharNo:string, 
        age:string, 
        bloodGroup:string, 
        branch:string, 
        comments:string|null, 
        comorbidConditions:string|null, 
        dob:string, 
        email:string, 
        fhName:string, 
        fullname:string, 
        gender:string, 
        mainComplaint:string | null, 
        maritalStatus:string, 
        occupation:string, 
        phone:string, 
        primaryConsultant:string| null, 
        referredBy:string, 
        religion:string, 
        sPhone:string, 
        title:string, 
    }
    residentailAddress:{
        addressLineOne:string, 
        addressLineTwo:string, 
        area:string, 
        city:string, 
        state:string,
        country:string,
        pincode:string,
    }
    uniqueId:number
    updated_at:string,
    _id:string,
}

type personalDetailsProps = {
    fullname:string,
    fhName: string,
    referredBy: string,
    dob: string,
    phone: string,
    email: string,
    occupation: string,
}

type residentailAddressProps = {
    city:string,
}

type otherProps = {
    year: string,
    fromDate: string,
    toDate: string,
}

export interface searchProps  {
    personalDetails: personalDetailsProps
    residentailAddress: residentailAddressProps
    other: otherProps
}

export type searchValueProps = {
    type:string,
    value: string,
    clinicId: string,
}

export type suggestionProps = {
    fullname: any[],
    fhName: any[],
    referredBy: any[],
    dob: any[],
    phone: any[],
    email: any[],
    occupation: any[],
    area: any[],
}

type suggesstPersonalDetailsProps = {
    fullname: string;
    gender: string;
    phone: string;
    referredBy: string
}

type suggesstResidentialAddressProps = {
    city: string;
}

type tempSuggestProps = {
    personalDetails: suggesstPersonalDetailsProps;
    residentailAddress: suggesstResidentialAddressProps;
    uniqueId: string;
    _id: string;
}

export type suggestDataProps = tempSuggestProps[];

export type listDispensePatientSingleProps = {
    age: string;
    branch: string;
    dispenseStatus:number
    editId: string;
    edited:number
    email: string;
    followUp: string;
    fullname: string;
    gender: string;
    mainComplaint: string;
    patientId:number
    phone: string;
    visitDate:number
    visitId: string;
}

type listDispensePatient = {
    age: string;
    branch: string;
    dispenseStatus:number
    editId: string;
    edited:number
    email: string;
    followUp: string;
    fullname: string;
    gender: string;
    mainComplaint: string;
    patientId:number
    phone: string;
    visitDate:number
    visitId: string;
}

export type listDispensePatientProps = listDispensePatient[]

export type consultationProps = {
    visitId: string,
    patientId: number,
    doctorId: string,
    clinicId: string,
    clinicBranch: string,
    submitType: number,
    visitDate: number,
    caseDetails: {
      consultation: string,
      recordOfInvestigation: string,
      prescription: string,
      compounderInstruction: string,
      followUpDate: string,
      followUpTime: string,
      followUpTestRequired: string,
      followUpRemainder: string,
      audioRecord: {},
      attachments: any,
    },
    consultationDetails: {
      consultationFee: number,
      medicationFee: number,
    },
    personalDetails: {
      primaryConsultant: string,
      mainComplaint: string,
      comments: string,
      comorbidConditions: string,
    },
}

export type visitProps = {
    actualVisitDate:string;
    caseDetails:{
        attachments:attachmentProps[]|undefined;
        audioRecord:attachmentProps|undefined;
        consultation:string;
        followUpDate:string;
        followUpInstruction:string;
        followUpRemainder:string|null;
        followUpTestRequired:string;
        followUpTime:string;
        prescription:string;
        recordOfInvestigation:string;
        diagnosis:string;
    }
    clinicId:string;
    consultationDetails:{
        consultationFee:string;
        dispenseTime:string;
        dispenserId:string;
        medicationDetails:any|null
        medicationFee:string;
        otherInstructions:string;
        paidAmount:string;
        paymentMethod:string;
        reasonShortPayment:string;
    }
    created_at:string;
    dispenseStatus:number
    doctorId:string;
    edited:number|null
    patientId:number
    starred:number;
    submitType:number;
    updated_at:string;
    visitDate:number;
    visitId:string;
    _id:string;
}[]

export const arrvisitProps:visitProps[]= [];

export type consultationRowOneProps = {
    alldata: patientProps | undefined;
    visit: visitProps | undefined;
};

export type consultationRowProps = {
    alldata: patientProps | undefined;
    visit: visitProps | undefined;
    setCaseDetails:Function
    setEditorChange:Function
    setConsultationDetails:Function
    setPersonalDetails:Function
    formSubmit: Function
    imageCollection: Function
};

export type starredPorps = {
    visitId: string,
    star: number,
    patientId: string,
    clinicId: string,
}

export type editPrescriptionProps = {
    html: string,
    caseDetails: string,
    roi:string,
    visitId: string|number,
}

export type updatePrescriptionProps = {
    data: editPrescriptionProps,
    clinicId: string;
    patientId: string;
}

export type addEditPatientProps = {
    personalDetails: {
        title: string;
        fullname: string;
        fhName: string;
        gender: string;
        phone: string;
        sPhone: string;
        email: string;
        branch: string;
        bloodGroup: string;
        maritalStatus: string;
        dob: string;
        age: string;
        occupation: string;
        religion: string;
        aadharNo: string;
        primaryConsultant: string;
        referredBy: string;
    },
    emergencyContact: {
        relation: string;
        aadharNo: string;
        firstname: string;
        surname: string;
        phone: string;
    },
    residentailAddress: {
        addressLineOne: string;
        addressLineTwo: string;
        area: string;
        city: string;
        state: string;
        pincode: string;
        country: string;
    },
}

export type addEditResponseProps = {
    type: string;
    message: string;
    data: {uniqueId: string}
}

type patientBranchProps = {
    _id: string;
    branchName: string;
}

export const arrBranchProps:patientBranchProps[] = [];

type patientUserProps = {
    _id: string;
    fullname: string;
}

export const arrUserhProps:patientUserProps[] = [];