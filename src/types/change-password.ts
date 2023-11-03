import { userTypeProps } from "./user";

export type changePasswordProps = {
    password: string;
    cpassword: string;
    clinicId:string|null
}

const arrUsertypeProps:userTypeProps[] = [];

export type userPermissionListProps = {
    name: string;
    page: string;
    permissions: {
        view: any;
    };
}[]

export type updateUserTpeParamsProps = {
    clinicId: string;
    id: string,
    permissions: userPermissionListProps,
}