import React, { useContext, useEffect, useState } from 'react';
import { Container, Header, Title, Content, Left, Right, Body, Text, StyleProvider, H3, Icon, Button, Spinner } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View, DrawerLayoutAndroidBase } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Linking, RefreshControl } from 'react-native';

import AuthContext from './AuthContext'

import patientService from './services/patients'

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [temFitbit, setTemFitbit] = useState(false);
  const [dados, setDados] = useState();

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
    fetchData();
  }, [])

  async function fetchData() {
    try {
      if (user.fitbitId) {
        const response = await patientService.getData(user.id, new Date());
        if (response !== undefined) {
          setDados(response);
          setTemFitbit(true);
        }
      }
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function refresh() {
    setUser({
      ...user,
      fitbitId: 'sim'
    });
    fetchData();
  }

  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <Header>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 5, justifyContent: 'center' }}>
            <Title style={{ alignSelf: 'center' }}>Projeto Asma</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={logout} >
              <Icon name="ios-log-out" style={{ color: 'green' }} />
            </Button>
          </Right>
        </Header>
        <Content
          padder
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
            />
          }
        >
          {isLoading ?
            <Spinner color='green' />
            :
            temFitbit ?
              <ShowFitbitInfo dados={dados} />
              :
              <Button block style={{ backgroundColor: 'green' }} onPress={() => Linking.openURL(`https://young-hollows-35414.herokuapp.com/auth/fitbit/${user.id}?origin=mobile`)}>
                <Text>Conectar ao Fitbit</Text>
              </Button>
          }
        </Content>
      </Container>
    </StyleProvider>
  );
}

function ShowFitbitInfo({ dados }) {
  const [minutosAtividade, setMinutosAtividade] = useState(dados.summary.fairlyActiveMinutes + dados.summary.veryActiveMinutes);
  const [meta, setMeta] = useState(30);

  const porcentagem = Math.floor(minutosAtividade / meta * 100);

  return (
    <>
      <H3 style={{ textAlign: 'center' }}>HOJE</H3>
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <AnimatedCircularProgress
          size={150}
          width={15}
          fill={porcentagem}
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
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>Você fez {minutosAtividade} minutos de atividade hoje.</Text>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sua meta é fazer {meta} minutos de atividade por dia.</Text>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>Você atingiu {porcentagem}% da sua meta hoje.{porcentagem >= 100 && ' Parabéns! 🥳'}</Text>
    </>
  );
}