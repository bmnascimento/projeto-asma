import React, { useState, useContext } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Text, Form, Item, Input, Label } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from './AuthContext'

import loginService from './services/login'

function LoginScreen({ navigation }) {
  const [rghg, setRGHG] = useState()
  const [senha, setSenha] = useState()

  const { setUser } = useContext(AuthContext);

  const login = async () => {
    try {
      const user = await loginService.login({
        rghg,
        senha
      });

      try {
        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(user));
      } catch (e) {
        console.log('erro ao escrever no async storage');
      }

      setUser(user);
    } catch (exception) {
      console.error('Usuário ou senha errados');
      console.error(exception)
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
            <Label>RGHG</Label>
            <Input value={rghg} onChangeText={setRGHG} />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input secureTextEntry={true} value={senha} onChangeText={setSenha} />
          </Item>
          <Button block success style={{ marginTop: 20 }} onPress={login}>
            <Text>Enviar</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default LoginScreen