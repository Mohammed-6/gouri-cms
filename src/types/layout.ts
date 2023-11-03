
export interface permissionProps {
    view: boolean,
    _id: string,
}

export type permissionsProps = {
    name: string,
    page: string,
    icon?: string,
    permissions: permissionProps,
    _id: string,
}

// const extendPermissionProp: permissionsProps[] = [];

export type clinicUserDataProps = {
    permissions: permissionsProps[],
    email: string,
    fullname: string,
    id: string,
    phone: string,
    username: string,
}
