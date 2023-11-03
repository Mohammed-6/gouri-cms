
type userListStructure = {
    clinicId: string,
    editId: string,
    email: string,
    fullname: string,
    phone: string,
}

export const userListProps:userListStructure[] = [];

export type addEditUserProps = {
    fullname: string,
    loginUsername: string,
    loginPassword: string,
    email: string,
    phone: string,
    profilePicture?: string,
}