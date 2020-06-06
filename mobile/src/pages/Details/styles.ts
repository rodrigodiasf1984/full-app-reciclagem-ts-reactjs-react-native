import styled from 'styled-components/native';
import {TouchableOpacity, Image, Text, SafeAreaView} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const ContainerIcon = styled(TouchableOpacity)``;

export const ContainerPrincipal = styled(SafeAreaView)`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  padding: 0px 32px 0px 32px;
  padding-top: 40px;
`;

export const PointImage = styled(Image)`
  width: 100%;
  height: 120px;
  /* resizemode: cover; */
  border-radius: 10px;
  margin-top: 32px;
`;

export const PointName = styled(Text)`
  color: #322153;
  font-size: 28px;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`;

export const PointItems = styled(Text)`
  font-family: 'Roboto_400Regular';
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c80;
`;

export const Address = styled.View`
  margin-top: 32px;
`;

export const AddressTitle = styled(Text)`
  color: #322153;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;

export const AddressContent = styled(Text)`
  font-family: 'Roboto_400Regular';
  line-height: 24px;
  margin-top: 8px;
  color: #6c6c80;
`;

export const Footer = styled.View`
  border-top-width: 1px;
  border-color: #ddd;
  padding: 20px 32px 20px 32px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled(RectButton)`
  width: 48%;
  background-color: #34cb79;
  border-radius: 10px;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  margin-left: 8px;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto_500Medium';
`;
