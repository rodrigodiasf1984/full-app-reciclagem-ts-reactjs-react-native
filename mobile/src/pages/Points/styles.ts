import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0px 32px 0px 32px;
  padding-top: 40px;
`;

export const ContainerIcon = styled(TouchableOpacity)``;

export const title = styled.Text`
  font-size: 20;
  font-family: 'Ubuntu_700Bold';
  margin-top: 24px;
`;

export const description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 4;
  font-family: 'Roboto_400Regular';
`;

export const mapContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 16px;
`;

export const map = styled.View`
  width: 100%;
  height: 100%;
`;

export const mapMarker = styled.View`
  width: 90;
  height: 80;
`;

export const mapMarkerContainer = styled.View`
  width: 90;
  height: 70;
  background-color: #34cb79;
  flex-direction: column;
  border-radius: 8;
  overflow: hidden;
  align-items: center;
`;

export const mapMarkerImage = styled.Image`
  width: 90;
  height: 45;
`;

export const mapMarkerTitle = styled.Text`
  flex: 1;
  font-family: 'Roboto_400Regular';
  color: #fff;
  font-size: 13;
  line-height: 23;
`;

export const itemsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 32;
`;

export const item = styled.View`
  background-color: '#fff';
  border-width: 2;
  border-color: '#eee';
  height: 120;
  width: 120;
  border-radius: 8;
  padding: 0px 16px 0px 32px;
  padding-top: 20px;
  padding-bottom: 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const selectedItem = styled.View`
  border-color: #34cb79;
  border-width: 2;
`;

export const itemTitle = styled.Text`
  font-family: 'Roboto_400Regular';
  text-align: center;
  font-size: 13;
`;
