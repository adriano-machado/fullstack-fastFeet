import styled from 'styled-components/native';
import Card from '~/components/Card';

export const Container = styled(Card)`
  margin: 10px 2px;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 15px 0px 0px 10px;
`;

export const DeliveryNumber = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;
export const Status = styled.View`
  margin: 0px 30px 0px 40px;
`;

export const Line = styled.View`
  height: 2px;
  background: #7d40e7;
  width: 100%;
  padding: 0px 30px;
  align-self: center;
  margin-top: 25px;
`;

export const DotContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const DotItem = styled.View`
  align-items: center;
  width: 33%;
  margin-left: ${(props) => (props.alignLeft ? '-15%' : '0px')};
  margin-right: ${(props) => (props.alignRight ? '-15%' : '0px')};
`;

export const Dot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: ${(props) => (props.filled ? '#7d40e7' : '#fff')};
  margin-top: -6px;
  border: 2px solid #7d40e7;
`;

export const DotText = styled.Text`
  margin-top: 5px;
  font-size: 10px;
  color: #999999;
  text-align: center;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  background: #f8f9fd;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
`;

export const Info = styled.View`
  justify-content: center;
`;

export const Label = styled.Text`
  color: #999999;
  font-size: 10px;
  text-align: left;
  font-weight: bold;
`;
export const Value = styled.Text`
  color: #444444;
  font-size: 12px;
  text-align: left;
  font-weight: bold;
`;

export const DetailsLink = styled.Text`
  font-size: 12px;
  font-weight: bold;

  color: #7d40e7;
`;
