export type searchParameterProps = {
    clinicId: string | null;
    fromDate: string;
    toDate: string;
}

export type searchProps = {
    visitId: string;
    patientId: string;
    doctorId: string;
    visitDate: any;
    followUp: string;
    consultation: string;
    prescription: string;
    recordOfInvestigation:string;
    phone: string;
    email: string;
    editId: string;
    fullname: string;
    age: string;
    mainComplaint: string;
}

export const arrSearchProps:searchProps[] = [];

type doctorListProps = {
    _id: string;
    fullname: string;
}

export const arrDoctorList:doctorListProps[] = [];