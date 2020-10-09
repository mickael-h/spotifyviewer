import { action, configure, observable } from 'mobx';
import LoginRepo from '../../repositories/LoginRepo';

configure({ enforceActions: 'observed' });

class LoginVM {
  @observable
  loginRepo = new LoginRepo();

  @action
  login = async navigation => {
    const loginResult = await this.loginRepo.login();
    if (loginResult.success) {
      navigation.navigate('Search');
    } else {
      console.log(`ERROR: ${loginResult.error}`);
    }
  };
}

export default LoginVM;
