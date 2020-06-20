import React, { useContext, useEffect } from 'react';
import { Container, Header, Title, Content, Left, Right, Body, Text, StyleProvider, H3, Icon, Button } from 'native-base';
import { Notifications } from 'expo';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from './AuthContext'

import patientService from './services/patients'

export default function MainScreen() {
  //Notifications.presentLocalNotificationAsync({ title: 'teste' })
  const name = 'Bernardo'
  const minutosAtividade = 0

  const { user, setUser } = useContext(AuthContext);

  async function logout() {
    try {
      await AsyncStorage.removeItem('usuarioLogado');
    } catch (e) {
      console.log('erro ao apagar do async storage');
    }

    setUser(null);
  }

  useEffect(() => {
    async function fetchData() {
      console.log('entrou')
      console.log(user)
      console.log(new Date())
      try {
        const dados = await patientService.getData(user.id, new Date());
        console.log(dados);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <Header>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1 }}>
            <Title>Projeto Asma</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button success transparent onPress={logout} >
              <Icon name="ios-log-out" />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <H3 style={{ textAlign: 'center' }}>HOJE</H3>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <AnimatedCircularProgress
              size={120}
              width={15}
              fill={40}
              rotation={0}
              lineCap="round"
              tintColor="green"
              backgroundColor="#eee">
              {
                (fill) => (
                  <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                    {fill}%
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Hoje você fez {minutosAtividade} minutos de atividade hoje.</Text>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sua meta é fazer {30} minutos de atividade por dia.</Text>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Você já atingiu {minutosAtividade / 30}% da sua meta hoje.</Text>
        </Content>
      </Container>
    </StyleProvider>
  );
}