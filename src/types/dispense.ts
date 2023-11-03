
export type listDispensePatientProps = {
    age:string;
    branch:string;
    dispenseStatus:number;
    editId:string;
    email:string;
    followUp:string;
    fullname:string;
    gender:string;
    mainComplaint:string;
    patientId:number;
    phone:string;
    visitDate:number;
    visitId:string;
}

export const arrlistDispensePatientProps:listDispensePatientProps[] = [];

type branchProps = {
    _id:string;
    branchName:string;
}

export const arrBranchProps:branchProps[] = [];

export type editDispense = {
    patientId: string;
    visitId: string;
    dispenserId: string;
    clinicId: string;
    dispenseTime: string;
    medicationDetails: [],
    otherInstructions: string;
    paidAmount: number;
    paymentMethod: string;
    reasonShortPayment: string;
    phone: string;
    sphone: string;
    email: string;
}


export type addEditPatientProps = {
    _id: string|null;
    uniqueId: string;
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
        fullname: string;
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

export type consultationProps = {
    uniqueId: string;
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