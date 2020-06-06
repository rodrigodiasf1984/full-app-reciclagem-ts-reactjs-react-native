import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  ContainerIcon,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Button,
  Footer,
  ButtonText,
  ContainerPrincipal,
} from './styles';

const Details = () => {
  const navigation = useNavigation();
  return (
    <ContainerPrincipal>
      <Container>
        <ContainerIcon
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </ContainerIcon>
        <PointImage
          source={{
            uri:
              'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          }}
        />
        <PointName>Mercado do seu Zé</PointName>
        <PointItems>Lâmpadas, Papelão</PointItems>
        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>BH, MG</AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button onPress={() => {}}>
          <Icon2 name="whatsapp" size={20} color="#FFF" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button onPress={() => {}}>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </ContainerPrincipal>
  );
};

export default Details;
