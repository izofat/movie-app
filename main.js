
let upcomingMovies = [];
let popularMovies = [];
let upcomingTVShows = [];
let popularTVShows = [];

window.onload = async function () {
    var elementMovies = document.getElementById('platformMovies');
    elementMovies.classList.add('homecontainer-centermenu-bar-platforms-as-active');
    checkWidth();
    checkWidth500();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDY4N2ZmNWRhNzg3OTA0ZjQ4ZjQwNGZkMDg3YmQ4ZCIsInN1YiI6IjY1NmIyNzZkNjUxN2Q2MDEyZmE5NmEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BRuxlgdvzaIuxFGbAIxyZGW_lB6e-lCP-PnQO8Fc-yE',
        },
    }
    const respondUpcomingMovies = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
    const resultUpcomingMovies = await respondUpcomingMovies.json();
    for (let i = 1; i < 4; i++) {
        var movie = {
            id: resultUpcomingMovies.results[i].id,
            title: resultUpcomingMovies.results[i].title,
            backdropPath: new URL('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + resultUpcomingMovies.results[i].backdrop_path),
        }
        upcomingMovies.push(movie);
    }
    const respondPopular = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    const resultPopular = await respondPopular.json();

    for (let i = 2; i < 5; i++) {
        var movie = {
            id: resultPopular.results[i].id,
            title: resultPopular.results[i].title,
            posterPath: new URL('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + resultPopular.results[i].poster_path),
        }
        popularMovies.push(movie)
    }

    const respondUpcomingTVShows = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options);
    const resultUpcomingTVShows = await respondUpcomingTVShows.json();
    for (let i = 0; i < 3; i++) {
        var movie = {
            id: resultUpcomingTVShows.results[i].id,
            title: resultUpcomingTVShows.results[i].name,
            backdropPath: new URL('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + resultUpcomingTVShows.results[i].backdrop_path),
        }
        upcomingTVShows.push(movie);
    }

    const respondPopularTVShows = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options);
    const resultPopularTVShows = await respondPopularTVShows.json();
    for (let i = 0; i < 3; i++) {
        var movie = {
            id: resultPopularTVShows.results[i].id,
            title: resultPopularTVShows.results[i].name,
            posterPath: new URL('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + resultPopularTVShows.results[i].poster_path),
        }
        popularTVShows.push(movie);
    }
    bringMovies();
    slideshow();
}

let platform = "movies";

var windowWidth = window.matchMedia("(max-width:600px)");
windowWidth.addEventListener('change', function () {
    checkWidth(windowWidth);
})

function checkWidth(windowWidth) {
    var elementIcon = document.getElementById('searchIcon');
    if (windowWidth && elementIcon.classList.contains('fa-lg')) {
        elementIcon.classList.remove('fa-lg');
    }
    else if (!elementIcon.classList.contains('fa-lg')) {
        elementIcon.classList.add('fa-lg');
    }
}
var windowWidthUnder500 = window.matchMedia("(max-width:500px)");
windowWidthUnder500.addEventListener('change', function () {
    checkWidth500(windowWidthUnder500);
})

function checkWidth500(windowWidthUnder500) {
    var elementLeftIcon = document.getElementById('leftIcon');
    var elementRightIcon = document.getElementById('rightIcon');
    var elementFavoriteIcon = document.getElementById('favoriteIcon');
    var elementDotIndex0 = document.getElementById('dotIndex0');
    var elementDotIndex1 = document.getElementById('dotIndex1');
    var elementDotIndex2 = document.getElementById('dotIndex2');

    if (windowWidthUnder500 && elementLeftIcon.classList.contains('fa-xl')) {
        elementLeftIcon.classList.remove('fa-xl');
        elementRightIcon.classList.remove('fa-xl');
        elementFavoriteIcon.classList.remove('fa-2xl');
        elementFavoriteIcon.classList.add('fa-xl');
        elementDotIndex0.classList.remove('fa-xs');
        elementDotIndex1.classList.remove('fa-xs');
        elementDotIndex2.classList.remove('fa-xs');
        elementDotIndex0.classList.add('fa-2xs');
        elementDotIndex1.classList.add('fa-2xs');
        elementDotIndex2.classList.add('fa-2xs');
    }
    else if (!elementLeftIcon.classList.contains('fa-xl')) {
        elementLeftIcon.classList.add('fa-xl');
        elementRightIcon.classList.add('fa-xl');
        elementFavoriteIcon.classList.remove('fa-xl');
        elementFavoriteIcon.classList.add('fa-2xl');
        elementDotIndex0.classList.remove('fa-2xs');
        elementDotIndex1.classList.remove('fa-2xs');
        elementDotIndex2.classList.remove('fa-2xs');
        elementDotIndex0.classList.add('fa-xs');
        elementDotIndex1.classList.add('fa-xs');
        elementDotIndex2.classList.add('fa-xs');
    }
}

let index = 0;
function slideshow() {
    setInterval(function () {
        index++;
        if (index == 3) {
            index = 0;
        }
        setSlideshow();
    }, 10000);
}

function changeSlideshow(element) {
    if (element.id == 'leftButton') {
        index--;
        if (index < 0) {
            index = 2;
        }
    }
    else {
        index++;
        if (index > 2) {
            index = 0;
        }
    }
    setSlideshow();
}

function setSlideshow() {
    var elementImg = document.getElementById('imgUpcoming');
    var elementMovieTitle = document.getElementById('movieTitle');
    if (platform == 'movies') {
        elementImg.src = upcomingMovies[index].backdropPath;
        elementMovieTitle.textContent = upcomingMovies[index].title;
        let favorites = JSON.parse(localStorage.getItem('favoriteMovies'));
        var elementFavoriteIcon = document.getElementById('favoriteIcon');
        
        if(favorites.some(id => id == upcomingMovies[index].id)){
            elementFavoriteIcon.classList.remove('fa-regular');
            elementFavoriteIcon.classList.add('fa-solid');
        }
        else{
            elementFavoriteIcon.classList.remove('fa-solid');
            elementFavoriteIcon.classList.add('fa-regular');
        }
    }
    else {
       
        elementImg.src = upcomingTVShows[index].backdropPath;
        elementMovieTitle.textContent = upcomingTVShows[index].title;
        let favorites = JSON.parse(localStorage.getItem('favoriteTVShows'));
        var elementFavoriteIcon = document.getElementById('favoriteIcon');
        if(favorites.some(id => id == upcomingTVShows[index].id)){
            elementFavoriteIcon.classList.remove('fa-regular');
            elementFavoriteIcon.classList.add('fa-solid');
        }
        else{
            elementFavoriteIcon.classList.remove('fa-solid');
            elementFavoriteIcon.classList.add('fa-regular');
        }
    }
    var elementDotIndex0 = document.getElementById('dotIndex0');
    var elementDotIndex1 = document.getElementById('dotIndex1');
    var elementDotIndex2 = document.getElementById('dotIndex2');
    switch (index) {
        case 0: {
            elementDotIndex0.classList.remove('fa-regular');
            elementDotIndex0.classList.add('fa-solid');
            elementDotIndex2.classList.remove('fa-solid');
            elementDotIndex2.classList.add('fa-regular');
            break;
        }
        case 1: {
            elementDotIndex1.classList.remove('fa-regular');
            elementDotIndex1.classList.add('fa-solid');
            elementDotIndex0.classList.remove('fa-solid');
            elementDotIndex0.classList.add('fa-regular');
            break;
        }
        case 2: {
            elementDotIndex2.classList.remove('fa-regular');
            elementDotIndex2.classList.add('fa-solid');
            elementDotIndex1.classList.remove('fa-solid');
            elementDotIndex1.classList.add('fa-regular');
            break;
        }
    }
}

function showPopulars(type) {
    let favorites = [];
    if (type == 'movies'){
        favorites = JSON.parse(localStorage.getItem('favoriteMovies'));        
    }
    else{
        favorites = JSON.parse(localStorage.getItem('favoriteTVShows'));
    }
    var elementIcon0 = document.getElementById('favoriteIconIndex0');
    var elementIcon1 = document.getElementById('favoriteIconIndex1');
    var elementIcon2 = document.getElementById('favoriteIconIndex2');
    elementIcon0.classList.remove('fa-solid');
    elementIcon0.classList.add('fa-regular');
    elementIcon1.classList.remove('fa-solid');
    elementIcon1.classList.add('fa-regular');
    elementIcon2.classList.remove('fa-solid');
    elementIcon2.classList.add('fa-regular');

    for(let i = 0 ; i < popularMovies.length ; i++){
        if(favorites.some(id => id == popularMovies[i].id) || favorites.some(id => id == popularTVShows[i].id)){
            var elementButton = null;
            switch(i){
                case 0:{
                    elementButton = document.getElementById('favoriteIconIndex0');
                    break;
                }
                case 1 :{
                    elementButton = document.getElementById('favoriteIconIndex1');        
                    break;
                }

                case 2:{
                    elementButton = document.getElementById('favoriteIconIndex2');
                    break;
                }
            }
            elementButton.classList.remove('fa-regular');
            elementButton.classList.add('fa-solid');
        }
    }
    var elementPopularTitleIndex0 = document.getElementById('moviePopularTitleIndex0');
    var elementPopularTitleIndex1 = document.getElementById('moviePopularTitleIndex1');
    var elementPopularTitleIndex2 = document.getElementById('moviePopularTitleIndex2');

    var elementPopularMovieImgIndex0 = document.getElementById('imgPopularIndex0');
    var elementPopularMovieImgIndex1 = document.getElementById('imgPopularIndex1');
    var elementPopularMovieImgIndex2 = document.getElementById('imgPopularIndex2');
    if (type == "movies") {

        elementPopularTitleIndex0.textContent = popularMovies[0].title;
        elementPopularTitleIndex1.textContent = popularMovies[1].title;
        elementPopularTitleIndex2.textContent = popularMovies[2].title;

        elementPopularMovieImgIndex0.src = popularMovies[0].posterPath;
        elementPopularMovieImgIndex1.src = popularMovies[1].posterPath;
        elementPopularMovieImgIndex2.src = popularMovies[2].posterPath;
    }
    else {

        elementPopularTitleIndex0.textContent = popularTVShows[0].title;
        elementPopularTitleIndex1.textContent = popularTVShows[1].title;
        elementPopularTitleIndex2.textContent = popularTVShows[2].title;

        elementPopularMovieImgIndex0.src = popularTVShows[0].posterPath;
        elementPopularMovieImgIndex1.src = popularTVShows[1].posterPath;
        elementPopularMovieImgIndex2.src = popularTVShows[2].posterPath;
    }
}


function h3Clicked(elementAlt, elementAnimation) {
    var elementAngle = document.getElementById(elementAnimation);
    elementAngle.classList.add('fa-bounce');
    setTimeout(function () {
        elementAngle.classList.remove('fa-bounce');
    }, 1000);
    var elementAltDiv = document.getElementById(elementAlt);
    if (elementAltDiv.classList.contains('homecontainer-uppermenu-alt-setdisplayflex')) {
        elementAltDiv.classList.remove('homecontainer-uppermenu-alt-setdisplayflex');

    }
    else {
        elementAltDiv.classList.add('homecontainer-uppermenu-alt-setdisplayflex');
    }
}
function searchIconClicked(element) {
    var elementSearchInput = document.getElementById('searchInput');
    elementSearchInput.focus();
    element.classList.add('fa-beat');
    setTimeout(function () {
        element.classList.remove('fa-beat');
    }, 800)
}

function setPlatforms(element) {
    switch (element.id) {
        case 'platformMovies': {
            element.classList.add('homecontainer-centermenu-bar-platforms-as-active');
            var elementOtherPlatform = document.getElementById('platformTV');
            elementOtherPlatform.classList.remove('homecontainer-centermenu-bar-platforms-as-active');
            platform = 'movies';
            setSlideshow();
            break;
        }
        case 'platformTV': {
            element.classList.add('homecontainer-centermenu-bar-platforms-as-active');
            var elementOtherPlatform = document.getElementById('platformMovies');
            elementOtherPlatform.classList.remove('homecontainer-centermenu-bar-platforms-as-active');
            platform = 'tv'
            setSlideshow();
            break;
        }
    }
}

function bringMovies() {
    platform = 'movies';
    index = 0;
    showPopulars('movies')
    removeClasses()
    setSlideshow();
}

function bringTVShows() {
    platform = 'tv';
    index = 0;
    showPopulars('tvShows')
    removeClasses()
    setSlideshow()
}

function removeClasses() {
    var elementDotIndex0 = document.getElementById('dotIndex0');
    var elementDotIndex1 = document.getElementById('dotIndex1');
    var elementDotIndex2 = document.getElementById('dotIndex2');
    elementDotIndex0.classList.remove('fa-solid');
    elementDotIndex1.classList.remove('fa-solid');
    elementDotIndex2.classList.remove('fa-solid');
    elementDotIndex0.classList.add('fa-regular');
    elementDotIndex1.classList.add('fa-regular');
    elementDotIndex2.classList.add('fa-regular');
}


//! battle field
function setFavorite(element) {
    if (element.id == 'favoriteButton') {
        
        if (platform == "movies") {
            let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));                        
            if(!favoriteMovies.some(id => id == upcomingMovies[index].id)){
                favoriteMovies.push(upcomingMovies[index].id);
                localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
            }           
            else{
                favoriteMovies = favoriteMovies.filter(id => id!= upcomingMovies[index].id);
                localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
            } 
        }
        else{
            let favoriteTVShows = JSON.parse(localStorage.getItem('favoriteTVShows'));   
            if(!favoriteTVShows.some(id => id == upcomingTVShows[index].id)){
                favoriteTVShows.push(upcomingTVShows[index].id);
                localStorage.setItem('favoriteTVShows', JSON.stringify(favoriteTVShows));
            } 
            else{
                console.log(upcomingTVShows);
                favoriteTVShows = favoriteTVShows.filter(id => id != upcomingTVShows[index].id);
                localStorage.setItem('favoriteTVShows', JSON.stringify(favoriteTVShows));
            }
        }
        setSlideshow();
    }
    else {
        let idMovie = -1;
        if(platform == "movies"){
            
            switch(element.id){
                case 'favoriteButtonIndex0':{
                    idMovie = popularMovies[0].id;
                    break;
                }
                case 'favoriteButtonIndex1':{
                    idMovie = popularMovies[1].id;
                    break;
                }
                case 'favoriteButtonIndex2':{
                    idMovie = popularMovies[2].id;
                    break;
                }
            }
            let favoriteMovies = [];
            let unarrayMovies = localStorage.getItem('favoriteMovies');
            favoriteMovies = JSON.parse(unarrayMovies);
            if(!favoriteMovies.some(id => id == idMovie)){
                favoriteMovies.push(idMovie);
                localStorage.setItem('favoriteMovies' ,JSON.stringify(favoriteMovies));
            }
            else{
                favoriteMovies = favoriteMovies.filter(id => id != idMovie);
                localStorage.setItem('favoriteMovies' ,JSON.stringify(favoriteMovies));
            }
        }
        else{
            
            switch(element.id){
                case 'favoriteButtonIndex0':{
                    idMovie = popularTVShows[0].id;
                    break;
                }
                case 'favoriteButtonIndex1':{
                    idMovie = popularTVShows[1].id;
                    break;
                }
                case 'favoriteButtonIndex2':{
                    idMovie = popularTVShows[2].id;
                    break;
                }
            }
            let favoriteTVShows = [];
            let unarrayMovies = localStorage.getItem('favoriteTVShows');
            favoriteTVShows = JSON.parse(unarrayMovies);
            if(!favoriteTVShows.some(id => id == idMovie)){
                favoriteTVShows.push(idMovie);
                localStorage.setItem('favoriteTVShows' , JSON.stringify(favoriteTVShows));
            }
            else{
                favoriteTVShows = favoriteTVShows.filter(id => id != idMovie);
                localStorage.setItem('favoriteTVShows', JSON.stringify(favoriteTVShows));
            }
        }
        showPopulars(platform);  
    }
   
}
//! 
