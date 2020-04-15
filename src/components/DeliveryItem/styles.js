import styled from 'styled-components/native';
import Card from '~/components/Card';

export const Container = styled(Card)`
  margin: 10px 2px;
  padding: 15px 15px;
`;

export const Status = styled.View`
  margin: 0px 20px;
`;
export const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
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
export const Dot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: ${(props) => (props.filled ? '#7d40e7' : '#fff')};
  margin-top: -6px;
  border: 2px solid #7d40e7;
`;

export const StatusTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  /* background: red; */
`;

export const StatusText = styled.Text`
  font-size: 12px;
  color: #999999;
  width: ${(props) => (props.justify ? '35%' : '33%')};
  text-align: ${(props) => props.align};
  /* background: black; */
  padding-right: ${(props) => (props.justify ? '45px' : '0px')};
`;
