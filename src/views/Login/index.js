import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { useViewModels } from '../../hooks';
import style from './style';

const Login = observer(({ route, navigation }) => {
  const { loginVM } = useViewModels();
  loginVM.login(navigation);
  return (
    <View style={style.main} />
  );
});

export default Login;
