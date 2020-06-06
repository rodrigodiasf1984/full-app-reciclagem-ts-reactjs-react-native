import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';
import {ScrollView} from 'react-native';
import api from '../../services/api';
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

const Points = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

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

  return (
    <ContainerPrincipal>
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
          <Map
            initialRegion={{
              latitude: 38.6560185,
              longitude: -9.0633101,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}>
            <MapMarker
              onPress={() => {
                navigation.navigate('Details');
              }}
              coordinate={{
                latitude: 38.6560185,
                longitude: -9.0633101,
              }}>
              <MapMarkerContainer>
                <MapMarkerImage
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                  }}
                />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </MapMarker>
          </Map>
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}>
          {items.map(item =>
            selectedItems.includes(item.id) ? (
              <SelectedItem>
                <Item
                  key={item.id}
                  activeOpacity={0.6}
                  onPress={() => handleSelectItem(item.id)}>
                  <SvgUri width={42} height={42} uri={item.image_url} />
                  <ItemTitle>{item.title}</ItemTitle>
                </Item>
              </SelectedItem>
            ) : (
              <Item
                key={item.id}
                activeOpacity={0.6}
                onPress={() => handleSelectItem(item.id)}>
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
