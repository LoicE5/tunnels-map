import express, {Express, Request, Response} from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'

const app: Express = express()

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser())

export default app