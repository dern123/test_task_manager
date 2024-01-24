const express = require('express');
const session = require('express-session');
const config = require('config');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const corsConfig = require('./server/middlewares/cors');
const pgSession = require('connect-pg-simple')(session);

const PORT = process.env.PORT || config.get("PORT");
const dotenv = require("dotenv");
dotenv.config({
  override: true,
  path: path.join(__dirname, "development.env")
})
const pool = require('./server/db/pool');
const c = require('config');

const app = express();
const server = require('http').Server(app);
app.use(bodyParser.json({limit: '100mb'}));
app.use(corsConfig);
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

dotenv.config();

const connectDB = async () => {
    const client = await pool.connect(); 
    try{
        const {rows} = await client.query("SELECT current_user");
        const currentUser = rows[0]["current_user"];
        console.log(currentUser)
    }catch(e){
        console.log(e);
    }
    finally{
        client.release
    }
} 

require("./server/routes/tasks/index.routes").configure(app);

async function start() {
    try {
        connectDB();
        server.listen(5000, () => {
            console.info(`Server started on port: ${PORT}`);
        })
    }catch(e) {
        console.error('SERVER EXIT', e);
    }
}

start();

module.exports = app