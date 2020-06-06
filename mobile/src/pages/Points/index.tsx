import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';
import {
  Container,
  ContainerIcon,
  Title,
  Description,
  MapContainer,
  Map,
  ItemsContainer,
  Item,
} from './styles';

const Points = () => {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <ContainerIcon
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </ContainerIcon>
        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta</Description>
        <MapContainer>
          <Map />
        </MapContainer>
      </Container>
      <ItemsContainer>
        <Item>
          <SvgUri
            width={42}
            height={42}
            uri="http://192.168.1.104:3333/uploads/lampadas.svg"
          />
        </Item>
      </ItemsContainer>
    </>
  );
};

export default Points;
