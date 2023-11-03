

export type messageProps = {
    message: string;
    chatId: string;
    clientId: string;
    clinicId: string;
}

export type arrDupMessageProps = {
    message: string;
    chatId: string;
    clientId: string;
    clinicId: string;
}[]

type userProps = {
    userId: string;
    fullname: string;
}

export const arrUserPorps:userProps[] = [];

export const arrMessageProps:messageProps[] = [];