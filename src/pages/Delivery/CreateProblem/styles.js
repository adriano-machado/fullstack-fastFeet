import styled from 'styled-components/native';
import Card from '~/components/Card';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: 0 30px;
`;

export const CardInput = styled(Card)`
  padding: 20px 40px 20px 20px;
  margin-top: 30px;
  min-height: 300px;

  justify-content: flex-start;
`;

export const InputProblem = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
  margin-top: 20px;
`;
