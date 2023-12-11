import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CadastroLanceLeilao = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  const [valor, setValor] = useState('');
  const [arrematanteId, setArrematanteId] = useState('');

  const goToListagemItensLeilao = () => {
    navigation.navigate('ListagemItensLeilao');
  };

  const handleCadastro = async () => {
    if (!valor || !arrematanteId) {
      return Alert.alert('Erro', 'Preencha todos os campos antes de cadastrar o lance.');
    }

    const newLance = {
      valor: parseFloat(valor),
      arrematante: {
        id: parseInt(arrematanteId)
      }
    };

    try {
      const response = await axios.put(
        `https://leilao-rest-api.herokuapp.com/lance/${id}`,
        newLance
      );

      console.log('Lance cadastrado com sucesso:', response.data);

      setValor('');
      setArrematanteId('');

      goToListagemItensLeilao();

      Alert.alert('Sucesso', 'Lance cadastrado com sucesso.');
    } catch (error) {
      console.error('Erro ao cadastrar o lance:', error);
      Alert.alert('Erro', 'Erro ao cadastrar o lance. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor do Lance:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValor(text)}
        value={valor}
        placeholder="Digite o valor do lance"
        keyboardType="numeric"
      />

      <Text style={styles.label}>ID do Arrematante:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setArrematanteId(text)}
        value={arrematanteId}
        placeholder="Digite o ID do arrematante"
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

export default CadastroLanceLeilao;
