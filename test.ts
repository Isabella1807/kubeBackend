type testdata = {
    a: number,
    b: number
}

interface IBaseProject {
    name: string,
    groupId: number,
}

interface IProject extends IBaseProject {
    id: number,
}

const test = (abc: IBaseProject) => {
    return abc.groupId * 2;
}

console.log(test({name: 'hey', groupId: 15}));

const createProject = (a: IBaseProject) => {

}

const fetchProjects = (): IProject[] => {
    return []
}
