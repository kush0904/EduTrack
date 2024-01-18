const express=require("express");
const app=express();

require("./db/conn");
app.use(express.json());

app.use(require("./routes/route"));                  

app.listen(5000);    