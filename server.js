import express, {json, urlencoded} from 'express';
import boxsRouteur from './routes/boxs.routes.js'

const app = express();

app.use(urlencoded({extended: false}));
app.use(json());

app.use('/boxs', boxsRouteur);
app.listen(3000, () => {
    console.log('app listen on 3000');
})