import styled from 'styled-components/native';
import Card from '~/components/Card';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
  align-self: center;
  margin-bottom: 12px;
`;
export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 10,
  },
})``;

export const Problem = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 17px 11px 17px 19px;
  margin-bottom: 15px;
`;

export const ProblemDescription = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const ProblemDate = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;
