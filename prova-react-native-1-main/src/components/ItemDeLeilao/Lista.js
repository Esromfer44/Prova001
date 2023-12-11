import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListagemItensLeilao = () => {
    const navigation = useNavigation();

    const [itensLeilao, setItensLeilao] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleListItens();
    }, []);

    const handleListItens = async () => {
        try {
            const response = await axios.get('https://leilao-rest-api.herokuapp.com/itemdeleilao/');
            setItensLeilao(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao obter os itens de leilão:', error);
            setLoading(false);
        }
    };

    const handleExcluirItem = async (itemId) => {
        try {
            await axios.delete(`https://leilao-rest-api.herokuapp.com/itemdeleilao/${itemId}`);
            handleListItens();
            Alert.alert('Sucesso', 'Item excluído com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir o item de leilão:', error);
            Alert.alert('Erro', 'Erro ao excluir o item de leilão. Tente novamente mais tarde.');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => goToDetalhesItemLeilao(item.id)} key={item.id}>
            <View style={styles.item}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.descricao}>{item.descricao}</Text>
                <Text style={styles.lanceMinimo}>Lance Mínimo: R$ {item.valorMinimo}</Text>
                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => handleExcluirItem(item.id)}
                >
                    <Text style={styles.textoBotaoExcluir}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const goToDetalhesItemLeilao = async (itemId) => {
        try {
            const res = await axios.get(`https://leilao-rest-api.herokuapp.com/itemdeleilao/${itemId}`);
            const item = res.data;
            navigation.navigate('DetalhesItemLeilao', { item });
        } catch (error) {
            console.error('Erro ao acessar o item de leilão:', error);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <>
                    <Text style={styles.titulo}>Itens de Leilão Disponíveis</Text>
                    <FlatList
                        data={itensLeilao}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        extraData={itensLeilao}
                    />
                    <TouchableOpacity onPress={() => goToCadastroItemLeilao()} style={styles.botao}>
                        <Text style={styles.textoBotao}>Criar</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginVertical: 8,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descricao: {
        fontSize: 16,
    },
    lanceMinimo: {
        fontSize: 14,
        color: 'green',
    },
    botao: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
    },
    botaoExcluir: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 8,
    },
    textoBotaoExcluir: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ListagemItensLeilao;
