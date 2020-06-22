import * as React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Fab, Label, Input, Item, Form, Textarea } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import { RefreshControl, Alert } from 'react-native';

import AuthContext from './AuthContext';

import sintomasService from './services/sintomas';

const Stack = createStackNavigator();

export default function JournalScreen({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName={'ListaSintomas'}
      screenOptions={{
        headerTintColor: 'green',
      }}>
      <Stack.Screen name="ListaSintomas" component={ListaSintomasScreen} options={{ title: 'Diário de Sintomas' }} />
      <Stack.Screen
        name="ItemSintomas"
        component={ItemSintomasScreen}
      /*options={{
        headerRight: () => (
          <Button transparent onPress={() => console.log('editar')} >
            <Text style={{ color: 'green' }} name="close">Editar</Text>
          </Button>
        )
      }}*/
      />
      <Stack.Screen name="AdicionarItemSintomas" component={AdicionarItemSintomasScreen} options={{ title: 'Adicionar Sintomas' }} />
    </Stack.Navigator>
  );
}

function ListaSintomasScreen({ navigation }) {
  const [listaSintomas, setListaSintomas] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setRefreshing(true);

    const sintomas = await sintomasService.getAll(user.id);
    setListaSintomas(sintomas);

    setRefreshing(false);
  }

  return (
    <Container>
      <Content
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      >
        <List>
          {listaSintomas.map(sintomas => {
            const objetoData = new Date(sintomas.dia);
            return (
              <ListItem key={sintomas.id} onPress={() => navigation.navigate('ItemSintomas', { sintomas })}>
                <Body>
                  <Text>{formatReadableDate(objetoData)}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            );
          })
          }
        </List>
      </Content>
      <Fab
        containerStyle={{}}
        style={{ backgroundColor: 'green' }}
        position="bottomRight"
        onPress={() => navigation.navigate('AdicionarItemSintomas')}>
        <Icon name="add" />
      </Fab>
    </Container>
  )
}

function formatReadableDate(objetoData) {
  return (`${objetoData.getHours()}h${String(objetoData.getMinutes()).padStart(2, '0')} do dia ${objetoData.getDate()}/${String(objetoData.getMonth() + 1).padStart(2, '0')}/${objetoData.getFullYear()}`);
}

function ItemSintomasScreen({ navigation, route }) {
  const sintomas = route.params.sintomas;
  const objetoData = new Date(sintomas.dia);
  navigation.setOptions({ title: formatReadableDate(objetoData) });

  return (
    <Container>
      <Content>
        <List>
          {sintomas.picoDeFluxo &&
            <ListItem avatar>
              <Left>
                <Text>{sintomas.picoDeFluxo}</Text>
              </Left>
              <Body>
                <Text>Pico de fluxo</Text>
              </Body>
            </ListItem>}
          <ItemSintoma nome="Tosse" teve={sintomas.tosse} />
          <ItemSintoma nome="Chiado" teve={sintomas.chiado} />
          <ItemSintoma nome="Falta de Ar" teve={sintomas.faltaDeAr} />
          <ItemSintoma nome="Acordar" teve={sintomas.acordar} />
          <ItemSintoma nome="Bombinha" teve={sintomas.bombinha} />
          <ItemSintomaDetalhes detalhes={sintomas.detalhes} />
        </List>
      </Content>
    </Container>
  );
}

function ItemSintoma({ nome, teve }) {
  return (
    <ListItem avatar>
      <Left>
        {teve ?
          <Icon name="checkmark" style={{ color: "green" }} />
          :
          <Icon name="close" style={{ color: "red" }} />
        }
      </Left>
      <Body>
        <Text>{nome}</Text>
      </Body>
    </ListItem>
  )
}

function ItemSintomaDetalhes({ detalhes }) {
  if (detalhes) {
    return (
      <ListItem>
        <Body>
          <Text>{detalhes}</Text>
        </Body>
      </ListItem>
    );
  } else {
    return(null);
  }
}

function AdicionarItemSintomasScreen({ navigation }) {
  const [picoDeFluxo, setPicoDeFluxo] = React.useState('');
  const [tosse, setTosse] = React.useState(false);
  const [chiado, setChiado] = React.useState(false);
  const [faltaDeAr, setFaltaDeAr] = React.useState(false);
  const [acordar, setAcordar] = React.useState(false);
  const [bombinha, setBombinha] = React.useState(false);
  const [detalhes, setDetalhes] = React.useState('');

  const { user } = React.useContext(AuthContext);
  async function submit() {
    try {
      const hoje = new Date();
      const sintomas = {
        dia: hoje.toISOString(),
        tosse,
        chiado,
        faltaDeAr,
        acordar,
        bombinha,
        picoDeFluxo: parseInt(picoDeFluxo),
        detalhes,
      };

      const resposta = await sintomasService.create(user.id, sintomas);
      navigation.navigate('ListaSintomas')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Content padder>
        <List>
          <Form>
            <Item>
              <Input keyboardType="numeric" value={picoDeFluxo} onChangeText={text => setPicoDeFluxo(text)} placeholder='Pico de fluxo' />
            </Item>
          </Form>
          <ListItem>
            <CheckBox
              disabled={false}
              value={tosse}
              tintColors={{ true: "green" }}
              onValueChange={() => setTosse(!tosse)}
            />
            <Body>
              <Text>Tosse</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
              disabled={false}
              value={chiado}
              tintColors={{ true: "green" }}
              onValueChange={() => setChiado(!chiado)}
            />
            <Body>
              <Text>Chiado</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
              disabled={false}
              value={faltaDeAr}
              tintColors={{ true: "green" }}
              onValueChange={() => setFaltaDeAr(!faltaDeAr)}
            />
            <Body>
              <Text>Falta de ar</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
              disabled={false}
              value={acordar}
              tintColors={{ true: "green" }}
              onValueChange={() => setAcordar(!acordar)}
            />
            <Body>
              <Text>Acordar</Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox
              disabled={false}
              value={bombinha}
              tintColors={{ true: "green" }}
              onValueChange={() => setBombinha(!bombinha)}
            />
            <Body>
              <Text>Bombinha</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Sintomas que sentiu durante/após o exercício, desconforto, nível de dificuldade, motivos por que não fez e se encontrou alguma barreira."
              value={detalhes}
              onChangeText={text => setDetalhes(text)}
            />
          </ListItem>
          <Button block style={{ backgroundColor: 'green' }} onPress={submit}>
            <Text>Enviar</Text>
          </Button>
        </List>
      </Content>
    </Container>
  );
}