import { action, configure, flow } from 'mobx';
import Spotify from '../remote-data-sources/Spotify';

configure({ enforceActions: 'observed' });

class LoginRepo {
  @action.bound
  login = flow(function* login() {
    return yield Spotify.login();
  });
}

export default LoginRepo;
