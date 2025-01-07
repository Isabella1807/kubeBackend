
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

enum ProjectState {
    on = 1,
    off = 0
}

export interface ResultSetHeader {
    "fieldCount": number,
    "affectedRows": number,
    "insertId": number,
    "info": string,
    "serverStatus": number,
    "warningStatus": number,
    "changedRows": number
}
