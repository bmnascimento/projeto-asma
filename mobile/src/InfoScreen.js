import React from 'react';
import { Image, Linking } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';

export default function InfoScreen() {
  const videos = [
    {
      texto: 'Como fazer alongamento',
      image: require('./images/1.png'),
      link: 'https://youtu.be/ATXlJ5RPOxI?t=67',
    },
    {
      texto: 'Como fazer exercícios respiratórios',
      image: require('./images/2.jpg'),
      link: 'https://www.youtube.com/watch?v=DKWd_CipOQg',
    },
    {
      texto: 'Entenda como o exercício físico pode ser um aliado no tratamento da asma',
      image: require('./images/3.png'),
      link: 'https://www.youtube.com/watch?v=gGX5DMjBRzk',
    },

  ]
  return (
    <Container>
      <Content padder>
        {videos.map((video, key) =>
          <Card key={key}>
            <CardItem>
              <Text>
                {video.texto}
              </Text>
            </CardItem>
            <CardItem cardBody button onPress={() => Linking.openURL(video.link)}>
              <Image source={video.image} style={{ height: 200, width: null, flex: 1 }} />
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
}