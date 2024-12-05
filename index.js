import express from 'express';
import cors from 'cors';
import Router from './routes/routes.js'
import projectRoutes from './routes/projectRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(Router);
app.use('/api', projectRoutes);

app.listen(port, () => {
    console.log("server is running");
})


/*deleteProjectByID(5).then((result)=>{
    console.log(result)
}).catch((error) => {
    console.log(error)
});*/
