import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

// Importar a logo
import logoImg from '../../assets/logo.png';

// Importar styles
import styles from './styles';

// Importar a api
import api from '../../services/api';

export default function Incidents() {
    // Armazenar estado dos incidents
    const [incidents, setIncidents] = useState([]);
    // Armazenar estado do número total de incidentes, sendo 0 o padrão
    const [total, setTotal] = useState(0);
    // Armazenar estado do número da página, sendo 1 a padrão
    const [page, setPage] = useState(1);
    // Armazenar estado de loading, para armazenar informação de quando estivermos buscando dados, para não carregarmos mais de 1 página por vez.
    const [loading, setLoading] = useState(false);

    // semelhante ao useHistory, para lembrar da última tela navegada
    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents () {
        // Se loading estiver como true, parar função. Para evitar que se uma requisição estiver sendo feita, outra requisição seja iniciada
        if (loading) {
            return;
        }

        // Se o total for maior que zero (ou seja, já foi carregada pelo menos a 1a pag) e o número de incidentes seja igual ao total, parar a função.
        if (total > 0  && incidents.length === total ) {
            return;
        }

        // Marcar como início do loading (true)
        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        // Anexar os incidents já buscados aos que serão buscados na próxima requisição
        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        // Aumentar o contador de páginas para a próxima requisição
        setPage(page + 1);
        // Marcar como fim do loading (false)
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            {/* FlatList é usado para conseguir fazer a rolagem dos itens de uma lista */}
            <FlatList 
                data ={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                // Tirar o símbolo de scroll da tela
                showsVerticalScrollIndicator={false}
                // Propriedade que aceita uma função que é disparada de forma automática quando um usuário chega ao final de uma lista
                onEndReached={loadIncidents}
                // Propriedade que define o quantos % do final da lista o usuário precisa estar para que carregue novos itens, definido de 0 a 1.
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>
                    
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color='#e02041'  />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}