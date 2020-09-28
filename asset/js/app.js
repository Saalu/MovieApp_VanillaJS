// connection 
const API_key = '13034522ae1dba1beb7eb678a5ec0681';
let url =`https://api.themoviedb.org/3/search/movie?api_key=${API_key}`

//   Selecting DOM Elements
 const movieForm = document.getElementById('form');
 const searchBtn = document.getElementById('search');
 const input = document.getElementById('input');

//   Event Listeners
  eventListeners()
  function eventListeners(){

    movieForm.addEventListener('submit', onSubmit)

  }


//   function & logic
  function onSubmit (e){
    e.preventDefault();

    const inputValue = input.value;
    
    const newURL = url + '&query=' + inputValue;
    console.log(newURL)
 fetch(newURL)
    .then((res)=> res.json() )
    .then((data)=>{
        console.log('Data', data)
    })
    .catch(err => {
        console.log('Error', err)
    })
    
    console.log(inputValue)

  }