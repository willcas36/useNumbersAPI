import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

var type= "trivia";
var number;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async (req, res) => {
    try {
        const response = await axios.get("http://numbersapi.com/random");
        const result = response.data;
        res.render("index.ejs", { data: result, type: type});
        } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
        });
        } 
});
app.post("/type",(req, res) => {
console.log(req.body.type);
type = req.body.type;
res.redirect("/num");
});

app.post("/resp",async (req,res) =>{
number = req.body.number;
res.redirect("/num");
});
app.get("/num",async (req, res) =>{
    try {
        const response = await axios.get("http://numbersapi.com/"+number+"/"+type);
        const result = response.data;
        res.render("index.ejs", { data: result, type: type});
        } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
        });
        }
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});