 const express = require('express')
 const cors=require('cors');
 const colord=require('colors');
 const morgan=require("morgan")
 const dotenv=require("dotenv");
const { connectDB } = require('./config/db');
 


 dotenv.config()
 //connection db

connectDB()



const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
 const port=process.env.PORT || 8080;

//  route??
app.get('/api/v1', (req, res) => {
  return res.json({ message: 'hi rajan singh' });
});

app.use('/api/v1/test',require('./routes/testRoute'))
app.use("/api/vi/auth",require("./routes/authRoutes"))
app.use("/api/vi/user",require("./routes/uerRoutes"))
app.use("/api/vi/resturant",require('./routes/resturantRouter'))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))