//Initial connection 
const API_key = '13034522ae1dba1beb7eb678a5ec0681';
 //const url =`https://api.themoviedb.org/3/search/movie?api_key=${API_key}`
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'


function generateURL(path){
    const url =`https://api.themoviedb.org/3${path}?api_key=${API_key}`
    return url
}


//  Upon Request
function requestMovies(url, onComplete, onError){
    fetch(url)
    .then((res)=> res.json() )
    .then(onComplete)
    .catch(onError)
}

// movie search logic 
function searchMovie(value){
    const path = '/search/movie';
    const url = generateURL(path) + '&query=' + value;
  
    requestMovies(url, renderMovies, handleError)
}
// 
// Upcoming Movie
function getUpcomingMovies(){
    const path = '/movie/upcoming';
    const url = generateURL(path);
    const render = showMovies.bind({title:'Upcoming Movies'})
    requestMovies(url, render, handleError)
}
//
// topRated Movie
function getTopRatedMovies(){
    const path = '/movie/top_rated';
    const url = generateURL(path);
    const render = showMovies.bind({title:'Top Rated Movies'})
  
    requestMovies(url, render, handleError)
}
//
// topRated Movie
function getPopularMovies(){
    const path = '/movie/popular';
    const url = generateURL(path);
    const render = showMovies.bind({title:'Popular Movies'})
  
    requestMovies(url, render, handleError)
}
//