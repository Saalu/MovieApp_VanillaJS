//Initial connection 
const API_key = '13034522ae1dba1beb7eb678a5ec0681';
// const url =`https://api.themoviedb.org/3/search/movie?api_key=${API_key}`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
//  Selecting DOM Elements
 const movieForm = document.getElementById('form');
 const searchBtn = document.getElementById('search');
 const input = document.getElementById('input');
 const result = document.getElementById('result');
//  const imgElement = document.querySelector('img');

//  Event Listeners
  eventListeners()
  function eventListeners(){
    movieForm.addEventListener('submit', onSubmit);
    result.addEventListener('click', watchMovie);
  }

  function generateURL(path){
      const url =`https://api.themoviedb.org/3${path}?api_key=${API_key}`
      return url
  }


// UI template loop
function movieSection(movies){
    return movies.map((movie)=>{
        if(movie.poster_path){
            return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id} />`;
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

function renderMovies (data){
    result.innerHTML =''
    const movies = data.results;
    const movieBlock = movieContainer(movies)
    result.appendChild(movieBlock)
    console.log('Data', movies)
}


// submit  function & logic
  function onSubmit (e){
    e.preventDefault();

    const inputValue = input.value;
    const path = '/search/movie';
    const newURL = generateURL(path) + '&query=' + inputValue;
    console.log(newURL)

    fetch(newURL)
    .then((res)=> res.json() )
    .then((data)=> renderMovies (data))
    .catch(err => {
        console.log('Error', err)
    })
    
    movieForm.reset()
    console.log(inputValue)
  }

  //Display video logic
  function watchMovie(e){
    e.preventDefault()
   let target =  e.target

   if(target.tagName.toLowerCase() === 'img'){
       const movieId = target.dataset.movieId;
        console.log(movieId)
      const section = target.parentElement; //section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display');
      console.log(content)
      
      const path =`/movie/${movieId}/videos`;
      const url = generateURL(path)
      fetch(url)
      .then((res)=> res.json() )
      .then((data)=>{
          console.log('video', data)
        })
        .catch(err => {
            console.log('Error', err)
        })
    }


   if(target.id === 'content-close'){
       const content = target.parentElement;
           content.classList.remove('content-display');


   }

  }