export interface UserWithPassword {
    "password": string,
    "userId": number,
    "roleId": number,
}

export interface User extends UserCreateData {
    userId: number
}

export interface UserCreateData {
    uclMail: string,
    "password": string,
    firstName: string,
    lastName: string,
    "roleId": number,
    teamId: number,
}


export enum UserRoles {
    admin = 5,
    faculty = 6,
    student = 7
}