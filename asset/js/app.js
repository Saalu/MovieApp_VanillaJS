//Initial connection 
const API_key = '13034522ae1dba1beb7eb678a5ec0681';
const url =`https://api.themoviedb.org/3/search/movie?api_key=${API_key}`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
//  Selecting DOM Elements
 const movieForm = document.getElementById('form');
 const searchBtn = document.getElementById('search');
 const input = document.getElementById('input');
 const result = document.getElementById('result');

//  Event Listeners
  eventListeners()
  function eventListeners(){
    movieForm.addEventListener('submit', onSubmit)

  }

// UI template loop
function movieSection(movies){
    return movies.map((movie)=>{
        if(movie.poster_path){
            return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id} />
                `;
        }
       })
}

// UI template container
function movieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.classList = 'movie';

    let movieTemplate =`
        
    <section class="section">
         ${movieSection(movies)}
    </section>

    <div class="content">
        <p id="content-close">X</p>
    </div>
        `;
    movieElement.innerHTML = movieTemplate;
    return movieElement

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
        const movies = data.results;
        const movieBlock = movieContainer(movies)
        result.appendChild(movieBlock)
        console.log('Data', movies)
    })
    .catch(err => {
        console.log('Error', err)
    })
    
    console.log(inputValue)
  }