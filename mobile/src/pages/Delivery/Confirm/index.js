import React, { useState } from 'react';

import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import api from '~/services/api';

import {
  Container,
  SignatureImage,
  SubmitButton,
  ImageIcon,
  CameraView,
} from './styles';

export default function Confirm({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const delivery = useSelector((state) => state.delivery.delivery);
  const profile = useSelector((state) => state.user.profile);

  let camera;
  async function handleSubmitImage() {
    if (!image)
      return Alert.alert('Ops', 'Você precisa mandar uma foto da assinatura!');
    try {
      setLoadingRequest(true);
      const data = new FormData();
      const filename = image.uri.split('/').pop();

      // Infer the type of the image
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      const imageToSend = { uri: image.uri, name: filename, type };

      data.append('file', imageToSend);
      const saveImage = await api.post('files', data);
      // Request to complete delivery
      await api.post(`delivery/${delivery.id}/complete-delivery`, {
        signature_id: saveImage.data.id,
        deliveryman_id: profile.id,
      });

      setLoadingRequest(false);

      return navigation.navigate('Dashboard');
    } catch (err) {
      console.tron.error(err);
      setLoadingRequest(false);

      return Alert.alert(
        'Sentimos muito',
        'Não conseguimos finalizar a encomenda por favor, tente novamente'
      );
    }
  }
  async function takePicture() {
    try {
      if (camera) {
        setLoading(true);
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        setImage(data);
        setLoading(false);
        setPreview(data.uri);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Sentimos muito',
        'Não conseguimos caputrar a imagem, por favor, tente novamente'
      );
      console.tron.error(err);
    }
  }

  function handleOption() {
    if (loading) {
      return (
        <ImageIcon onPress={() => {}}>
          <ActivityIndicator color="#FFF" />
        </ImageIcon>
      );
    }
    if (preview) {
      return (
        <ImageIcon onPress={() => setPreview(null)}>
          <Icon name="undo" color="#FFF" size={30} />
        </ImageIcon>
      );
    }

    return (
      <ImageIcon onPress={takePicture}>
        <Icon name="camera" color="#FFF" size={30} />
      </ImageIcon>
    );
  }
  return (
    <Background>
      <Container>
        {preview ? (
          <SignatureImage source={{ uri: preview }} />
        ) : (
          <CameraView>
            <RNCamera
              captureAudio={false}
              ref={(ref) => {
                camera = ref;
              }}
              style={{
                flex: 1,
              }}
              androidCameraPermissionOptions={{
                title: 'Permissão para utilizar camera',
                message:
                  'Precisamos da sua permissão para utilizar a camera do seu celular',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancelar',
              }}
            />
          </CameraView>
        )}
        {handleOption()}
        <SubmitButton loading={loadingRequest} onPress={handleSubmitImage}>
          Enviar
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
