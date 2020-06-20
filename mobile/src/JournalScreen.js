import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Form, Item, Input, Label } from 'native-base';

export default function JournalScreen({ navigation }) {
  return (
    <Container>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button block success style={{ marginTop: 20 }}>
            <Text>Enviar</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}