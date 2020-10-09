const API_URL = 'http://4d01faa75409.ngrok.io/';

const constants = Object.freeze({
  CLIENT_ID: '37fbb1a5ec594370a5291fa59d769a6d',
  LOGIN_URL: `${API_URL}login`,
  REDIRECT_URL: `${API_URL}callback`,
  REFRESH_URL: `${API_URL}refresh_token`,
  SEARCH_URL: `${API_URL}search`,
  RELEASES_URL: `${API_URL}releases`,
  ALBUMS_URL: `${API_URL}albums`,
  TRACKS_URL: `${API_URL}tracks`,
});

export default constants;
