export interface BaseTeam {
    teamId: number,
    teamName: string
}

export interface CountedTeam extends BaseTeam {
    memberCount: number
}
