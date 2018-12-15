import axios from 'axios';

var config = {
    headers: {'X-My-Custom-Header': 'Header-Value'}
};

const api_key = 'a5b048e479232b12580ede0285f73f64';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie?query=terror&api_key={api_key}'
});

axios.get('/search/movie?query=terror&api_key={api_key}', config)
.then(data => {
    return data;
});

