export const STOP_REQUEST = (req, res) => {
    console.log("DO NOT DELETE PROJECTS WE CANT MAKE NEW ONES");
    res.status(403).send("DO NOT DELETE PROJECTS WE CANT MAKE NEW ONES")
}