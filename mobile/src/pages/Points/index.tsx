import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Container, ContainerIcon} from './styles';

const Points = () => {
  return (
    <>
      <Container>
        <ContainerIcon>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </ContainerIcon>
      </Container>
    </>
  );
};

export default Points;
