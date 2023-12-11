import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CadastroParticipanteLeilao = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [leilaoAberto, setLeilaoAberto] = useState(true);

  const goToListagemParticipantesLeilao = () => {
    navigation.navigate('ListagemParticipantesLeilao');
  };

  const handleCadastro = async () => {
    if (!nome || !cpf) {
      return Alert.alert('Erro', 'Preencha todos os campos antes de cadastrar o participante.');
    }

    const newParticipante = {
      nome,
      cpf,
      leilaoAberto,
    };

    try {
      const response = await axios.post(
        'https://leilao-rest-api.herokuapp.com/participante/',
        newParticipante
      );

      console.log('Participante de leilão cadastrado com sucesso:', response.data);

      setNome('');
      setCpf('');
      setLeilaoAberto(true);

      goToListagemParticipantesLeilao();

      Alert.alert('Sucesso', 'Participante cadastrado com sucesso.');
    } catch (error) {
      console.error('Erro ao cadastrar o participante de leilão:', error);
      Alert.alert('Erro', 'Erro ao cadastrar o participante. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Participante:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNome(text)}
        value={nome}
        placeholder="Digite o nome do participante"
      />

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCpf(text)}
        value={cpf}
        placeholder="Digite o CPF do participante"
        keyboardType="numeric"
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default CadastroParticipanteLeilao;
