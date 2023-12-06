
let favoriteMovieIds = [];
let favoriteTVShowIds = [];

let favoriteMovies = [];
let favoriteTVShows = [];


window.onload = async function () {
    let unarrayFavorites = localStorage.getItem('favoriteMovies');
    favoriteMovieIds = JSON.parse(unarrayFavorites);
    unarrayFavorites = localStorage.getItem('favoriteTVShows');
    favoriteTVShowIds = JSON.parse(unarrayFavorites);
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDY4N2ZmNWRhNzg3OTA0ZjQ4ZjQwNGZkMDg3YmQ4ZCIsInN1YiI6IjY1NmIyNzZkNjUxN2Q2MDEyZmE5NmEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BRuxlgdvzaIuxFGbAIxyZGW_lB6e-lCP-PnQO8Fc-yE'
        },
    };

    for (let i = 0; i < favoriteMovieIds.length; i++) {

        const APIURL = new URL('https://api.themoviedb.org/3/movie/' + parseInt(favoriteMovieIds[i]) + '?language=en-US')
        const respondFavorite = await fetch(APIURL, options);
        const resultFavorite = await respondFavorite.json();
        var item = {
            id: resultFavorite.id,
            title: resultFavorite.title,
            posterPath: new URL('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + resultFavorite.poster_path),
        }
        favoriteMovies.push(item);
    }

    for (let i = 0; i < favoriteTVShowIds.length; i++) {
        const APIURL = new URL('https://api.themoviedb.org/3/tv/' + parseInt(favoriteTVShowIds[i]) + '?language=en-US')
        const respondFavorite = await fetch(APIURL, options);
        const resultFavorite = await respondFavorite.json();
        var item = {
            id: resultFavorite.id,
            title: resultFavorite.name,
            posterPath: new URL('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + resultFavorite.backdrop_path),
        }
        favoriteTVShows.push(item);
    }

    showFavorites();


}


function showFavorites() {
    var parentElementMovie = document.getElementById('moviesAlt');

    for (let k = 0; k < favoriteMovies.length; k++) {
        var elementBox = document.createElement('div');
        elementBox.classList.add('homecontainer-centermenu-popular-alt-box');

        var elementChildH3 = document.createElement('h3');
        elementChildH3.textContent = favoriteMovies[k].title;
        elementChildH3.classList.add('homecontainer-centermenu-popular-alt-box-h1');
       
        var elementChildButtonIcon = document.createElement('i');

        let favorites = JSON.parse(localStorage.getItem('favoriteMovies'));
        if(favorites.some(id => id == favoriteMovies[k].id)){
            elementChildButtonIcon.classList.add('fa-solid');
        }
        else{
            elementChildButtonIcon.classList.add('fa-regular');
        }
        elementChildButtonIcon.classList.add('fa-heart');
        elementChildButtonIcon.classList.add('fa-xl');  
        elementChildButtonIcon.id = 'favoriteIconMovie'+k;

        var elementChildFavoriteButton = document.createElement('button');
        elementChildFavoriteButton.classList.add('homecontainer-centermenu-popular-alt-box-favoritebutton');
        elementChildFavoriteButton.id = 'favoriteButtonMovie' + k;
        elementChildFavoriteButton.addEventListener('click',function(){
            removeFavorite('movie',k);
            changeIconFavorite('movie',k);
        });
        elementChildFavoriteButton.appendChild(elementChildButtonIcon);
        
        var elementImgMovie = document.createElement('img');
        elementImgMovie.classList.add('homecontainer-centermenu-popular-alt-box-img');
        elementImgMovie.src = favoriteMovies[k].posterPath;

        elementBox.appendChild(elementChildH3);
        elementBox.appendChild(elementChildFavoriteButton);
        elementBox.appendChild(elementImgMovie);

        parentElementMovie.appendChild(elementBox);
    }

    var parentElementTVShow = document.getElementById('tvshowsAlt');

    for (let k = 0; k < favoriteTVShows.length; k++) {
        var elementBox = document.createElement('div');
        elementBox.classList.add('homecontainer-centermenu-popular-alt-box');

        var elementChildH3 = document.createElement('h3');
        elementChildH3.textContent = favoriteTVShows[k].title;
        elementChildH3.classList.add('homecontainer-centermenu-popular-alt-box-h1');
       
        var elementChildButtonIcon = document.createElement('i');
        let favorites = JSON.parse(localStorage.getItem('favoriteTVShows'));
        if(favorites.some(id => id == favoriteTVShows[k].id)){
            elementChildButtonIcon.classList.add('fa-solid');
        }
        else{
            elementChildButtonIcon.classList.add('fa-regular');
        }
        elementChildButtonIcon.classList.add('fa-heart');
        elementChildButtonIcon.classList.add('fa-xl');  
        elementChildButtonIcon.id = 'favoriteIconTVShow'+k;

        var elementChildFavoriteButton = document.createElement('button');
        elementChildFavoriteButton.classList.add('homecontainer-centermenu-popular-alt-box-favoritebutton');
        elementChildFavoriteButton.id = 'favoriteButtonTVShow' + k;
        elementChildFavoriteButton.addEventListener('click',function(){
            removeFavorite('tv', k);
            changeIconFavorite('tv',k)
        });
        elementChildFavoriteButton.appendChild(elementChildButtonIcon);
        
        var elementImgMovie = document.createElement('img');
        elementImgMovie.classList.add('homecontainer-centermenu-popular-alt-box-img');
        elementImgMovie.src = favoriteTVShows[k].posterPath;

        elementBox.appendChild(elementChildH3);
        elementBox.appendChild(elementChildFavoriteButton);
        elementBox.appendChild(elementImgMovie);

        parentElementTVShow.appendChild(elementBox);
    }
}



function removeFavorite(conditon , index){
    if(conditon == 'movie'){
        let favorites = JSON.parse(localStorage.getItem('favoriteMovies'));
        favorites = favorites.filter(id => id != favorites[index]);
        localStorage.setItem('favoriteMovies',JSON.stringify(favorites));
    }
    else{
        let favorites = JSON.parse(localStorage.getItem('favoriteTVShows'));
        favorites = favorites.filter(id => id != favorites[index]);
        localStorage.setItem('favoriteTVShows',JSON.stringify(favorites));
    }
}

function changeIconFavorite(platform , index){
    if(platform == 'tv'){
        var elementIconFavorite = document.getElementById('favoriteIconTVShow'+ index);
        if(elementIconFavorite.classList.contains('fa-regular')){
            elementIconFavorite.classList.remove('fa-regular');
            elementIconFavorite.classList.add('fa-solid');
        }
        else{
            elementIconFavorite.classList.add('fa-regular');
            elementIconFavorite.classList.remove('fa-solid');
        }
    }
    else{
        var elementIconFavorite = document.getElementById('favoriteIconMovie'+ index);
        if(elementIconFavorite.classList.contains('fa-regular')){
            elementIconFavorite.classList.remove('fa-regular');
            elementIconFavorite.classList.add('fa-solid');
        }
        else{
            elementIconFavorite.classList.add('fa-regular');
            elementIconFavorite.classList.remove('fa-solid');
        }
    }
}