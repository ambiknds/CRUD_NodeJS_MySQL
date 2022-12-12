const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUDDataBase'
});

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}))

//create data
app.post("/api/insert", (req,res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews(movieName, movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview],(err,result)=> {
        console.log(result);
    })
})

//read data
app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect,(err,result)=> {
        res.send(result);
})
})

//update data
app.put('/api/update', (req,res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name], (err,result) => {
        if(err) console.log(err);
    })
})

//delete data
app.delete('/api/delete/:movieName', (req,res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete, name, (err,result) => {
        if(err) console.log(err);
    })
})


app.listen(3001, () => {
    console.log('running on port 3001');
})

