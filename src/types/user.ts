
export type userTypeProps = {
    userType: string;
    _id: string;
    __v: number
}

export type branchProps = {
    branchName: string;
    _id: string;
    __v: number
}

type userProps = {
    editId: string;
    email: string;
    fullname: string;
    phone: string;
    userType: string;
}

export const arrUserProps: userProps[] = [];

export const arrUsertypeProps: userTypeProps[] = [];

export const  arrBranchProps: branchProps[] = [];

export type branchListProps = {
    data: branchProps[];
    type:string;
    message:string;
}

export type userTypeListProps = {
    data: userTypeProps[];
    type:string;
    message:string;
}

export type addBranchProps = {
    closeAction: Function,
    submitAction: Function,
}

export type addUserTypeProps = {
    closeAction: Function,
    submitAction: Function,
}

export type loadUserType_BranchProps = {
    usertype: userTypeProps[];
    branch: branchProps[];
}

export type addUserProps = {
    fullname: string;
    loginUsername: string;
    loginPassword: string;
    email: string;
    phone: string;
    userType: string;
    clinicBranch: string;
}