import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieReviewList(response.data)
    })
  },[])

  const submitReview = () => {
    
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: review,
    });
    setMovieReviewList([
          ...movieReviewList, 
          {movieName: movieName, movieReview: review},
        ])      
  } 
  const addMovie = (e) => {
    setMovieName(e.target.value);
  }

  const addReview = (e) => {
    setReview(e.target.value);
  } 

  const addNewReview = (e)=> {
    setNewReview(e.target.value)
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movie, 
      movieReview: newReview,
    })
    setNewReview('');

  }
  
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name='movieName' value={movieName} onChange={addMovie}/>
        <label>Review</label>
        <input type="text" name="review" value={review} onChange={addReview}/>
        <button disabled={!movieName && !review} onClick={submitReview}>Submit</button>
      </div>
      <div className="cards">
        {movieReviewList.map((val) => {
          return (
            
              <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>
              <div className='update'>
                <input type="text" id='updateInput' onChange={addNewReview} placeholder='Update review'/>
                <button disabled={!newReview} onClick={()=>{updateReview(val.movieName)}}>Update</button>
              </div>
              <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
              </div>
          )
        })}
        </div>
    </div>
  );
}

export default App;
