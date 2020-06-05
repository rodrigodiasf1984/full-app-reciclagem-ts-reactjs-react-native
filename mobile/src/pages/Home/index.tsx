import React from 'react';
import {Image} from 'react-native';
import logo from '../../assets/logo.png';
import {Container} from './styles';
const Home = () => {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
};

export default Home;
