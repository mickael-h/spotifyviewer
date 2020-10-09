import { Platform } from 'react-native';
import RNInAppBrowser from 'react-native-inappbrowser-reborn';
import constants from '../../../constants';
import queryString from 'query-string';

const INVALID_TOKEN_ERROR = 'Invalid access token';

class Spotify {
  static accessToken;
  static refreshToken;

  static login = async () => {
    let returnValues;
    let res;
    try {
      res = await RNInAppBrowser.openAuth(constants.LOGIN_URL,
        getDeepLink('callback'),
        {
          ephemeralWebSession: false,
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }
      );
    } catch (error) {
      res = error;
    }

    if (res.type == 'success') {
      const credentials = getObjectFromReturnedURL(res.url);
      this.accessToken = credentials.access_token;
      this.refreshToken = credentials.refresh_token;

      returnValues = {
        success: true,
      };
    } else {
      returnValues = {
        success: false,
        error: res,
      };
    }

    return returnValues;
  };

  static sendAlbumTracksQuery = albumId =>
    this.sendSpotifyQuery(constants.TRACKS_URL,
      {
        id: albumId,
        access_token: this.accessToken,
      }
    );

  static sendArtistAlbumsQuery = artistId =>
    this.sendSpotifyQuery(constants.ALBUMS_URL,
      {
        id: artistId,
        access_token: this.accessToken,
      }
    );

  static sendNewReleasesQuery = () =>
    this.sendSpotifyQuery(constants.RELEASES_URL,
      {
        access_token: this.accessToken,
      }
    );

  static sendSearchQuery = query =>
    this.sendSpotifyQuery(constants.SEARCH_URL,
      {
        q: query,
        type: 'artist',
        access_token: this.accessToken,
      }
    );

  static sendSpotifyQuery = async (url, query) => {
    const queryUrl = queryString.stringifyUrl({ url, query });
    let result = await get(queryUrl);
    if (result?.resp?.body?.error?.message == INVALID_TOKEN_ERROR) {
      await this.refreshAccessToken();
      result = await get(queryUrl);
    }
    return result;
  };

  static refreshAccessToken = async () => {
    const queryUrl = queryString.stringifyUrl({
      url: constants.REFRESH_URL,
      query: {
        refresh_token: this.refreshToken
      }
    });
    const result = await get(queryUrl);
    this.accessToken = result?.access_token;
  };
}

const getObjectFromReturnedURL = url => {
  if (url == null) {
    return null;
  }
  const params = {};
  const paramsStr = url.split('#')[1];
  const decomposedParamStrs = paramsStr.split('&');
  decomposedParamStrs.forEach(paramStr => {
    const paramArr = paramStr.split('=');
    params[paramArr[0]] = paramArr[1];
  });

  return params;
};

const getDeepLink = path => {
  const scheme = 'preview-scheme';
  const prefix = Platform.OS == 'android' ? `${scheme}://spotify-preview/` : `${scheme}://`;
  return prefix + path;
};

const get = async (url, extraOpts = {}) => {
  const opts = {
    credentials: 'include',
  };

  const response = await fetch(url, Object.assign(opts, extraOpts));
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    return getUserError(response, json);
  }
  if (!response.ok) {
    return `An unexpected error occured: ${response.statusText}`;
  }
  return response;
};

const getUserError = (response, json) =>
  json.error || response.statusText;

export default Spotify;
