
export interface BaseProject {
    "projectId": number,
    "templateId": number,
    "userId": number,
    "projectName": string,
    "createdDate": string,
    "subdomainName": string,
    "lastChangeDate": string,
    "uclMail": string,
    "firstName": string,
    "lastName": string,
    "teamName": string,
    "state": ProjectState
}

export interface ProjectWithStackId extends BaseProject {
    stackId: number,
}

export enum ProjectState {
    on = 1,
    off = 0
}

export interface UserObject {
    userId: number,
    uclMail: string,
    password: string,
    firstName: string,
    lastName: string,
    roleId: number,
    teamId: number,
    role: { isAdmin: boolean, isFaculty: boolean, isStudent: boolean }
}

export interface NewProjectBody {
    templateId: string,
    projectName: string,
    subdomainName: string
}

export interface CreateProjectBody {
    templateId: number,
    projectName: string,
    subdomainName: string,
    userId: number,
    stackId: number,
}

export interface UpdateProjectState {
    projectId: number,
    state: ProjectState
}

