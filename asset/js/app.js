
//  Selecting DOM Elements
 const movieForm = document.getElementById('form');
 const searchBtn = document.getElementById('search');
 const input = document.getElementById('input');
 const result = document.getElementById('result');
 const movieWrapper = document.getElementById('movies-container');

 
//  const imgElement = document.querySelector('img');

//  Event Listeners
  eventListeners()
  function eventListeners(){
    movieForm.addEventListener('submit', onSubmit);
    result.addEventListener('click', watchMovie);
  }

 


// UI template loop
function movieSection(movies){
    const section = document.createElement('section');
    section.classList = 'section';
    movies.map((movie)=>{
        if(movie.poster_path){
            const img  = document.createElement('img');
            img.src = IMAGE_URL + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);

            section.appendChild(img);
        }
       })

       return section;
}

// UI template container
function movieContainer(movies, title=''){
    const movieElement = document.createElement('div');
    movieElement.classList = 'movie';

    const header = document.createElement('h2');
    header.innerHTML = title;

    const content = document.createElement('div');
    // content.classList = 'content';

    const contentClose = `<p id="content-close">X</p>`;
    // content.innerHTML = contentClose;

    const section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);

   return movieElement;

}



// error func
function handleError(error){
    console.log('Error: ', error)
}

// render search movies
function renderMovies (data){
    result.innerHTML =''
    const movies = data.results;
    const movieBlock = movieContainer(movies)
    result.appendChild(movieBlock)
    console.log('Data', movies)
}

// show upcoming
function showMovies(data){
    const movies = data.results;
    const movieBlock = movieContainer(movies, this.title)
    movieWrapper.appendChild(movieBlock)
}


// submit  function & logic
  function onSubmit (e){
    e.preventDefault();

    const inputValue = input.value;

//  fetch API logic
    searchMovie(inputValue)
    
    movieForm.reset()
    console.log(inputValue)
  }

//   iFrame
function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width =360;
    iframe.height = 315;
    iframe.allowFullscreen =true;

    return iframe;
}

//video template
function videoTemplate(data, content){

    content.innerHTML = '<p id="content-close">X</p>'
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeWrapper = document.createElement('div');


    for (let i = 0; i< length; i++){
          const video  = videos[i]; // video
          const iframe = createIframe(video)
          iframeWrapper.appendChild(iframe)
          content.appendChild(iframeWrapper)
    }

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
        content.classList.add('content');
        content.classList.add('content-display');
      console.log(content)
      
      const path =`/movie/${movieId}/videos`;
      const url = generateURL(path)

      fetch(url)
      .then((res)=> res.json() )
      .then((data)=>{
        videoTemplate(data, content)
        })
        .catch(err => {
            console.log('Error', err)
        })
    }


   if(target.id === 'content-close'){
       const content = target.parentElement;
           content.classList.remove('content-display')

   }

  }

  searchMovie('spiderman')

getUpcomingMovies(); 


getTopRatedMovies()

getPopularMovies()





