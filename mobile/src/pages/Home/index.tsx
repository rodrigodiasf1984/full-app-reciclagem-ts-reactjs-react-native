import React, {useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import background from '../../assets/home-background.png';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

import {
  Container,
  Main,
  Title,
  Description,
  Footer,
  Button,
  ButtonText,
  ButtonIcon,
  CustomImage
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}
const pickerSelectStyles = {
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#6c6c80',
  },
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#6c6c80',
  },
  placeholder: { color: '#ddd' },
};


const Home = ({navigation}: any) => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUF === '0') {
      return;
    }
    //carrega as cidades toda vezes que o utilizador escolher um estado
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      });
  }, [selectedUF]);

  return (
    <Container
      source={background}
      imageStyle={{
        width: 204,
        height: 288,
      }}>
      <Main>
        <CustomImage source={logo} />
        <Title> Seu marketplace de coleta de resíduos</Title>
        <Description>
          Ajudamos as pessoas encontrarem pontos de coleta de forma eficiente.
        </Description>
      </Main>
      <Footer>
      <RNPickerSelect
            placeholder={{
              color: '#f00',
              label: 'Selecione a UF',
            }}
            value={selectedUF}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedUF}
            items={ufs?.map(uf => ({
              label: uf,
              value: uf,
            }))}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Selecione a Cidade',
            }}
            value={selectedCity}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedCity}
            items={cities?.map(city => ({
              label: city,
              value: city,
            }))}
          />
        <Button       
          onPress={() => {
            navigation.navigate('Points', {selectedUF, selectedCity});
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
