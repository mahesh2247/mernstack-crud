const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//import routes

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');


//app

const app = express()

//dB
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser:true,useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(() => console.log('Database Connected!'))
.catch(err=>console.log(err));


//middlewares
// app.use(cors({origin: true, credentials: true}));
app.use(cors(),function(req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",'POST','OPTIONS'
    );
    next();
});
// app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())

//routes middleware

app.use('/api',postRoutes);
app.use('/api',authRoutes);



//listen port

const port = process.env.PORT || 8000

app.listen(port,()=>console.log(`Server is running on port ${port}`));

