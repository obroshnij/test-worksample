import express, {Express, Request, Response} from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { initTables } from "./infra/db";
import CreateUser from './domains/users/operations/createUser';
import FetchAllUsers, { SortOrderDirection } from './domains/users/operations/fetchAllUsers';

dotenv.config();

const port = process.env.PORT || 3111;
const app: Express = express();

initTables();

app.use(cors())
  .use(express.json())
  .options('*', cors());

app.post('/users', (req: Request, res: Response) => {
  try {
    const userCreator = new CreateUser(
      req.body.first_name,
      req.body.last_name
    )
    
    userCreator.create().then(
      u => res.send(u.asJSON()).status(201)
    )
  } catch(e: any) {
    res.send({ error: "There was an error while creating a user. Hold on!"}).status(400)
  }
});

app.get('/users', (req: Request, res: Response) => {
  const sortOrder = {
    "createdAt": req.query.created === 'asc' ? SortOrderDirection.ASC : SortOrderDirection.DESC
  }

  try {
    const fetchAllUsers = new FetchAllUsers(sortOrder);

    fetchAllUsers.fetch().then(
      users => {
        // @ts-ignore
        const data = users.map(inst => inst.asJSON())
        res.send(data).status(200)
      }
    )
  } catch(e: any) {
    console.log(e)
    res.send({ error: "There was an error while fetching users. Hold on!"}).status(400)
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app