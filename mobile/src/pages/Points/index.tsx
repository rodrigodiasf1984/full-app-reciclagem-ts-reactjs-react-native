import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { ScrollView, Alert, PermissionsAndroid } from 'react-native';
import api from '../../services/api';
import Geolocation from '@react-native-community/geolocation';
import Toast from '../../components/Toast';

import {
  Container,
  ContainerIcon,
  Title,
  Description,
  MapContainer,
  Map,
  ItemsContainer,
  Item,
  ItemTitle,
  MapMarker,
  MapMarkerImage,
  MapMarkerContainer,
  MapMarkerTitle,
  ContainerPrincipal,
  SelectedItem,
} from './styles';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface RouteParams {
  selectedCity: string;
  selectedUF: string;
}

const Points = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [items, setItems] = useState<Item[]>([]);
  const [nearPoints, setNearPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [initialPositon, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Ecoleta necessita da sua permissão',
            message:
              'Ecoleta precisa da sua localização' +
              'para encontrar os pontos de coleta mais próximos de você.',
            buttonNeutral: 'Perguntar mais tarde',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Autorizar',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          // Alert.alert(
          //   'Ooops.. ',
          //   'Precisamos de sua permissão para obter a localização dos pontos de coleta',
          // );
          Toast.error(
            'Precisamos de sua permissão para obter a localização dos pontos de coleta',
          );
          return;
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestLocationPermission();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        setInitialPosition([latitude, longitude]);
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  useEffect(() => {
    async function loadItems() {
      api.get('items').then(response => {
        setItems(response.data);
      });
    }
    loadItems();
  }, []);

  useEffect(() => {
    //console.log(routeParams, 'route params');
    api
      .get('points', {
        params: {
          city: routeParams.selectedCity,
          uf: routeParams.selectedUF,
          items: [selectedItems],
        },
      })
      .then(response => {
        setNearPoints(response.data.points);
        console.log(response.data.points, 'pointsfasdfasdf');
      });
  }, [selectedItems, routeParams.selectedCity, routeParams.selectedUF]);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);
    if (alreadySelected >= 0) {
      //si já foi selecionado e clicou novamente remove do array
      const fielteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(fielteredItems);
    } else {
      //senão estiver já sido selecionado adiciona
      setSelectedItems([...selectedItems, id]);
    }
  }

  function handleNavigateToDetails(id: number) {
    navigation.navigate('Details', { point_id: id });
  }
  //console.log(nearPoints, 'NEARPOINTSSSSS');
  return (
    <ContainerPrincipal>
      <Container>
        <ContainerIcon
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </ContainerIcon>
        <Title>Bem vindo.</Title>
        <Description>Encontre no mapa um ponto de coleta</Description>
        <MapContainer>
          {initialPositon[0] !== 0 && (
            <Map
              loadingEnabled={initialPositon[0] === 0}
              initialRegion={{
                latitude: initialPositon[0],
                longitude: initialPositon[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {nearPoints &&
                nearPoints.map(point => (
                  <MapMarker
                    key={String(point.id)}
                    onPress={() => handleNavigateToDetails(point.id)}
                    coordinate={{
                      latitude: point.latitude,
                      longitude: point.longitude,
                    }}
                  >
                    <MapMarkerContainer>
                      <MapMarkerImage
                        source={{
                          uri: point.image_url,
                        }}
                      />
                      <MapMarkerTitle>{point.name}</MapMarkerTitle>
                    </MapMarkerContainer>
                  </MapMarker>
                ))}
            </Map>
          )}
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          {items.map(item =>
            selectedItems.includes(item.id) ? (
              <SelectedItem>
                <Item
                  key={String(item.id)}
                  activeOpacity={0.6}
                  onPress={() => handleSelectItem(item.id)}
                >
                  <SvgUri width={42} height={42} uri={item.image_url} />
                  <ItemTitle>{item.title}</ItemTitle>
                </Item>
              </SelectedItem>
            ) : (
              <Item
                key={item.id}
                activeOpacity={0.6}
                onPress={() => handleSelectItem(item.id)}
              >
                <SvgUri width={42} height={42} uri={item.image_url} />
                <ItemTitle>{item.title}</ItemTitle>
              </Item>
            ),
          )}
        </ScrollView>
      </ItemsContainer>
    </ContainerPrincipal>
  );
};

export default Points;
