import React, { Component } from 'react';

import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
export default class Booked extends Component {
  render() {
    return (
      <Container>
        <Header/>
        <Content>
          <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>My haircut Style</Text>
              <Right>
                <Icon name="bookmark" />
              </Right>
             </CardItem>
           </Card>
           <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>My Barber</Text>
              <Right>
                <Icon name="bookmark" />
              </Right>
             </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}