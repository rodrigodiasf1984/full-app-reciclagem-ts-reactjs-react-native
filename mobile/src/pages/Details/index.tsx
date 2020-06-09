import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../services/api';
import {ActivityIndicator, Linking} from 'react-native';
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

interface RouteParams {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}
const Details = () => {
  const [Data, setData] = useState<Data>({} as Data);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, [routeParams.point_id]);

  if (!Data.point) {
    return ActivityIndicator;
  }
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
            uri: Data.point.image,
          }}
        />
        <PointName>{Data.point.name}</PointName>
        <PointItems>{Data.items.map(item => item.title).join(', ')}</PointItems>
        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {' '}
            {Data.point.city}, {Data.point.uf}
          </AddressContent>
        </Address>
      </Container>
      <Footer>
        <Button
          onPress={() =>
            Linking.openURL(
              `whatsapp://send?phone=${
                Data.point.whatsapp
              }&text=Tenho interesse em ajudar na coleta de resíduos`,
            )
          }>
          <Icon2 name="whatsapp" size={20} color="#FFF" />
          <ButtonText>WhatsApp</ButtonText>
        </Button>
        <Button
          onPress={() =>
            Linking.openURL(
              `mailto:${
                Data.point.email
              }?subject=Tenho interesse em ajudar na coleta de resíduos`,
            )
          }>
          <Icon name="mail" size={20} color="#FFF" />
          <ButtonText>E-mail</ButtonText>
        </Button>
      </Footer>
    </ContainerPrincipal>
  );
};

export default Details;
