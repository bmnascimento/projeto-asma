import React from 'react';
import { Image, Linking } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';

export default function InfoScreen() {
  const videos = [
    {
      titulo: 'Como a asma funciona (legendado)',
      id: 'PzfLDi-sL3w',
    },
    {
      titulo: 'Como fazer exercícios respiratórios',
      id: 'DKWd_CipOQg',
    },
    {
      titulo: 'Entenda como o exercício físico pode ser um aliado no tratamento da asma',
      id: 'gGX5DMjBRzk',
    },
    {
      titulo: 'Como se aquecer pra correr',
      id: '4FtJ--4p4sg',
    },
  ]
  return (
    <Container>
      <Content padder>
        {videos.map((video, key) =>
          <Card key={key}>
            <CardItem>
              <Text>
                {video.titulo}
              </Text>
            </CardItem>
            <CardItem cardBody button onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.id}`)}>
              <Image source={{ uri: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg` }} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
}