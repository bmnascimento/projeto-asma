import * as React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text, Form, Item, Input, Label } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import AuthContext from './AuthContext'

import loginService from './services/login'

function LoginScreen() {
  const [rghg, setRGHG] = React.useState();
  const [senha, setSenha] = React.useState();

  const { setUser } = React.useContext(AuthContext);

  const login = async () => {
    try {
      const user = await loginService.login({
        rghg: rghg,
        password: senha,
      });

      await AsyncStorage.setItem('usuarioLogado', JSON.stringify(user));

      setUser(user);
    } catch (exception) {
      Alert.alert('Erro', 'Usuário ou senha errados');
      console.log(exception);
    }
  }

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Label>RGHC</Label>
            <Input value={rghg} onChangeText={setRGHG} />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input secureTextEntry={true} value={senha} onChangeText={setSenha} />
          </Item>
          <Button block style={{ marginTop: 20, backgroundColor: "green" }} onPress={login}>
            <Text>Enviar</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default LoginScreen