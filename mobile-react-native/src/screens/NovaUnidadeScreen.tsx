import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import api from '../services/api';

export default function NovaUnidadeScreen({ route, navigation }: any) {
  const { imovelId } = route.params;
  const [numero, setNumero] = useState('');
  const [valorAluguel, setValorAluguel] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!numero || !valorAluguel) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const valor = parseFloat(valorAluguel.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Erro', 'Valor do aluguel inválido');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/unidades', {
        imovel_id: imovelId,
        numero,
        valor_aluguel: valor,
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.detail || 'Erro ao criar unidade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Número da Unidade *</Text>
          <TextInput
            style={styles.input}
            value={numero}
            onChangeText={setNumero}
            placeholder="Ex: 101, A, 1º Andar"
          />

          <Text style={styles.label}>Valor do Aluguel (R$) *</Text>
          <TextInput
            style={styles.input}
            value={valorAluguel}
            onChangeText={setValorAluguel}
            placeholder="Ex: 1500.00"
            keyboardType="decimal-pad"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSalvar}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Salvando...' : 'Salvar Unidade'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
