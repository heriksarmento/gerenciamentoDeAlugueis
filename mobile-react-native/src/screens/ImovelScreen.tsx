import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import api from '../services/api';

export default function ImovelScreen({ route, navigation }: any) {
  const { imovelId } = route.params;
  const [imovel, setImovel] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    carregarImovel();
  }, []);

  const carregarImovel = async () => {
    try {
      const response = await api.get(`/api/imoveis/${imovelId}`);
      setImovel(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o imóvel');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarImovel();
    setRefreshing(false);
  };

  const handleDeletarImovel = () => {
    Alert.alert('Deletar Imóvel', 'Deseja realmente deletar este imóvel?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/api/imoveis/${imovelId}`);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível deletar o imóvel');
          }
        },
      },
    ]);
  };

  const handleDeletarUnidade = (unidadeId: number) => {
    Alert.alert('Deletar Unidade', 'Deseja realmente deletar esta unidade?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/api/unidades/${unidadeId}`);
            carregarImovel();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível deletar a unidade');
          }
        },
      },
    ]);
  };

  const handleDeletarLocatario = (locatarioId: number) => {
    Alert.alert('Remover Locatário', 'Deseja realmente remover este locatário?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/api/locatarios/${locatarioId}`);
            carregarImovel();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover o locatário');
          }
        },
      },
    ]);
  };

  if (!imovel) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{imovel.nome}</Text>
          <Text style={styles.subtitle}>{imovel.endereco}</Text>
          <Text style={styles.text}>
            {imovel.cidade} - {imovel.estado}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDeletarImovel}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Unidades</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate('NovaUnidade', { imovelId: imovel.id })
            }
          >
            <Text style={styles.addButtonText}>+ Unidade</Text>
          </TouchableOpacity>
        </View>

        {imovel.unidades?.map((unidade: any) => (
          <View key={unidade.id} style={styles.unidadeCard}>
            <View style={styles.unidadeHeader}>
              <View style={styles.unidadeInfo}>
                <Text style={styles.unidadeNumero}>Unidade {unidade.numero}</Text>
                <View
                  style={[
                    styles.badge,
                    unidade.status === 'alugado' ? styles.badgeAlugado : styles.badgeDisponivel,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      unidade.status === 'alugado'
                        ? styles.badgeTextAlugado
                        : styles.badgeTextDisponivel,
                    ]}
                  >
                    {unidade.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleDeletarUnidade(unidade.id)}>
                <Text style={styles.deleteButtonSmall}>🗑️</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.unidadeValor}>
              R$ {unidade.valor_aluguel.toFixed(2)}/mês
            </Text>

            {unidade.locatario ? (
              <View style={styles.locatarioCard}>
                <View style={styles.locatarioInfo}>
                  <Text style={styles.locatarioNome}>{unidade.locatario.nome}</Text>
                  <Text style={styles.locatarioText}>CPF: {unidade.locatario.cpf}</Text>
                  {unidade.locatario.telefone && (
                    <Text style={styles.locatarioText}>
                      Tel: {unidade.locatario.telefone}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleDeletarLocatario(unidade.locatario.id)}
                >
                  <Text style={styles.removeText}>Remover</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addLocatarioButton}
                onPress={() =>
                  navigation.navigate('NovoLocatario', { unidadeId: unidade.id })
                }
              >
                <Text style={styles.addLocatarioText}>+ Adicionar Locatário</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {(!imovel.unidades || imovel.unidades.length === 0) && (
          <Text style={styles.emptyText}>Nenhuma unidade cadastrada</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: '#9ca3af',
  },
  deleteButton: {
    fontSize: 24,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  unidadeCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  unidadeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  unidadeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unidadeNumero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeAlugado: {
    backgroundColor: '#FEE2E2',
  },
  badgeDisponivel: {
    backgroundColor: '#D1FAE5',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  badgeTextAlugado: {
    color: '#991B1B',
  },
  badgeTextDisponivel: {
    color: '#065F46',
  },
  deleteButtonSmall: {
    fontSize: 18,
  },
  unidadeValor: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  locatarioCard: {
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locatarioInfo: {
    flex: 1,
  },
  locatarioNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  locatarioText: {
    fontSize: 12,
    color: '#6b7280',
  },
  removeText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '600',
  },
  addLocatarioButton: {
    backgroundColor: '#DC2626',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  addLocatarioText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 20,
  },
});
