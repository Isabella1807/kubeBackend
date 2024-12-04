import { getAllTeams, getTeamById, createTeam, deleteTeamByID } from "../models/teamModel.js";

export const teamController = {
  getAll: async (request, response) => {
    try {
      const teams = await getAllTeams();
      response.json(teams);
    } catch (error) {
      response.status(500).send(error);
    }
  },
  // getById
  getByID: async (request, response) => {
    try {
      const team = await getTeamById(request.params.id);
      response.json(team); 
    } catch (error) {
      response.status(500).send(error);
    }
  },
  create: async (req, res) => {
    const { teamName } = req.body;

    if (typeof teamName !== "string" || teamName.length === 0) {
      res.status(400).send("no team name");
      return;
    }

    try {
      await createTeam(teamName);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send("id not a number");
      return;
    }

    try {
      await deleteTeamByID(id);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
