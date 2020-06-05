import React from 'react';
import {Image} from 'react-native';
import logo from '../../assets/logo.png';
import background from '../../assets/home-background.png';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonText,
  ButtonIcon,
} from './styles';
const Home = ({navigation}: any) => {
  return (
    <Container
      source={background}
      imageStyle={{
        width: 274,
        height: 368,
      }}>
      <Main>
        <Image source={logo} />
        <Title> Seu marketplace de coleta de resíduos</Title>
        <Description>
          Ajudamos as pessoas encontrarem pontos de coleta de forma eficiente.
        </Description>
      </Main>
      <Footer>
        <Button
          onPress={() => {
            navigation.navigate('Points');
          }}>
          <ButtonIcon>
            <Icon name="arrow-right" size={30} color="#FFF" />
          </ButtonIcon>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
