import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px;
`;
export const CameraView = styled.View`
  align-self: center;
  width: 100%;
  height: 440px;
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
`;
export const SignatureImage = styled.Image`
  width: 100%;
  height: 440px;
  border-radius: 4px;
  margin-top: 10px;
`;

export const ImageIcon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border-radius: 60px;
  align-self: center;
  margin-top: -80px;
  margin-bottom: 25px;
  background: rgba(0, 0, 0, 0.3);
`;
export const SubmitButton = styled(Button)`
  background: #7d40e7;
  margin-top: 10px;
`;
