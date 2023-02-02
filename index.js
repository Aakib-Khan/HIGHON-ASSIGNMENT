import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import { connectDB } from './Config/DB.js'
import path from 'path';
import userRoutes from './routes/users.js'
import { fileURLToPath } from 'url';
const PORT = process.env.PORT
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors())
connectDB()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use('/user', userRoutes)

    
app.use(express.static(path.join(__dirname,'/client/build')));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname,'/client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, console.log(`Server Running on ${PORT}`))