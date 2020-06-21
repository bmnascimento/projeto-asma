import * as React from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, List, ListItem, Fab, View, Label, Input, Item, Form } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CheckBox from '@react-native-community/checkbox';
import { RefreshControl } from 'react-native';

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
                  <Text>{objetoData.toLocaleTimeString('pt-BR')} do dia {objetoData.toLocaleDateString('pt-BR')}</Text>
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

function ItemSintomasScreen({ navigation, route }) {
  const sintomas = route.params.sintomas;
  const objetoData = new Date(sintomas.dia)
  navigation.setOptions({ title: `${objetoData.toLocaleTimeString('pt-BR')} do dia ${objetoData.toLocaleDateString('pt-BR')}` })

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

  return (
    <Container>
      <Content>
        <List>
          <ItemSintoma nome="Tosse" teve={sintomas.tosse} />
          <ItemSintoma nome="Chiado" teve={sintomas.chiado} />
          <ItemSintoma nome="Falta de Ar" teve={sintomas.faltaDeAr} />
          <ItemSintoma nome="Acordar" teve={sintomas.acordar} />
          <ItemSintoma nome="Bombinha" teve={sintomas.bombinha} />
        </List>
      </Content>
    </Container>
  )
}

function AdicionarItemSintomasScreen({ navigation }) {
  const [picoDeFluxo, setPicoDeFluxo] = React.useState('');
  const [tosse, setTosse] = React.useState(false);
  const [chiado, setChiado] = React.useState(false);
  const [faltaDeAr, setFaltaDeAr] = React.useState(false);
  const [acordar, setAcordar] = React.useState(false);
  const [bombinha, setBombinha] = React.useState(false);

  const { user } = React.useContext(AuthContext);

  async function submit() {
    const hoje = new Date();

    const sintomas = {
      dia: hoje.toISOString(),
      tosse,
      chiado,
      faltaDeAr,
      acordar,
      bombinha,
    };

    const resposta = await sintomasService.create(user.id, sintomas);
    console.log(resposta);
    navigation.navigate('ListaSintomas')
  }

  return (
    <Container>
      <Content padder>
        <List>
          <Form>
            <Item inlineLabel>
              <Label>Pico de fluxo</Label>
              <Input keyboardType="numeric" value={picoDeFluxo} onChangeText={text => setPicoDeFluxo(text)} />
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
          <Button block style={{ backgroundColor: 'green' }} onPress={submit}>
            <Text>Enviar</Text>
          </Button>
        </List>
      </Content>
    </Container>
  );
}