import AsyncStorage from '@react-native-community/async-storage';

const PREFIX = '@spotifypreview';

class Database {

  static #get = async key => {
    try {
      await AsyncStorage.getItem(`${PREFIX}_${key}`);
    } catch (e) {
      this.#handleError(e);
    }
  };

  static #set = async (key, value) => {
    try {
      await AsyncStorage.setItem(`${PREFIX}_${key}`, String(value));
    } catch (e) {
      this.#handleError(e);
    }
  };

  static #handleError = error => {
    console.log('DATABASE ERROR:', error);
  }
}

export default Database;
