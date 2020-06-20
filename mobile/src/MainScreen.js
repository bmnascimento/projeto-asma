import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Title, Content, Left, Right, Body, Text, StyleProvider, H3, Icon, Button } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from './AuthContext'

import patientService from './services/patients'

export default function MainScreen() {
  const [ dados, setDados ] = useState();
  const { user, setUser } = useContext(AuthContext);

  async function logout() {
    try {
      await AsyncStorage.removeItem('usuarioLogado');
      setUser(null);
    } catch (e) {
      console.log('erro ao apagar do async storage');
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await patientService.getData(user.id, new Date());
        setDados(response);
        console.log(response);
        if (dados !== undefined)
          minutosAtividade = dados.summary.fairlyActiveMinutes + dados.summary.veryActiveMinutes;
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  let minutosAtividade = 0;
  let meta = 30;

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
              fill={minutosAtividade/meta}
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
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sua meta é fazer {meta} minutos de atividade por dia.</Text>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Você atingiu {minutosAtividade/meta}% da sua meta hoje.</Text>
        </Content>
      </Container>
    </StyleProvider>
  );
}