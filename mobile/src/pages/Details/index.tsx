import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { ActivityIndicator, Linking } from 'react-native';
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
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: Array<{
    title: string;
  }>;
}
const Details = () => {
  const [data, setData] = useState<Data>({} as Data);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, [routeParams.point_id]);

  if (!data.point) {
    return <ActivityIndicator />;
  }

  return (
    <ContainerPrincipal>
      {data.point && (
        <>
          <Container>
            <ContainerIcon
              onPress={() => {
                navigation.navigate('Points');
              }}
            >
              <Icon name="arrow-left" size={20} color="#34cb79" />
            </ContainerIcon>
            <PointImage
              source={{
                uri: data.point.image_url,
              }}
            />
            <PointName>{data.point.name}</PointName>
            <PointItems>
              {data.items.map(item => item.title).join(', ')}
            </PointItems>
            <Address>
              <AddressTitle>Endereço</AddressTitle>
              <AddressContent>
                {data.point.city}, {data.point.uf}
              </AddressContent>
            </Address>
          </Container>
          <Footer>
            <Button
              onPress={() =>
                Linking.openURL(
                  `whatsapp://send?phone=${
                    data.point.whatsapp
                  }&text=Tenho interesse em ajudar na coleta de resíduos`,
                )
              }
            >
              <Icon2 name="whatsapp" size={20} color="#FFF" />
              <ButtonText>WhatsApp</ButtonText>
            </Button>
            <Button
              onPress={() =>
                Linking.openURL(
                  `mailto:${
                    data.point.email
                  }?subject=Tenho interesse em ajudar na coleta de resíduos`,
                )
              }
            >
              <Icon name="mail" size={20} color="#FFF" />
              <ButtonText>E-mail</ButtonText>
            </Button>
          </Footer>
        </>
      )}
    </ContainerPrincipal>
  );
};

export default Details;
