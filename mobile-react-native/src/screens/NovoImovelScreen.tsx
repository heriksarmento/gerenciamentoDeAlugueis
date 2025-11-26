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

export default function NovoImovelScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarCep = async (cepValue: string) => {
    const cepLimpo = cepValue.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const response = await api.get(`/api/imoveis/buscar-cep/${cepLimpo}`);
      setEndereco(response.data.endereco);
      setCidade(response.data.cidade);
      setEstado(response.data.estado);
    } catch (error) {
      // CEP não encontrado, usuário pode preencher manualmente
    }
  };

  const handleCepChange = (text: string) => {
    setCep(text);
    if (text.replace(/\D/g, '').length === 8) {
      buscarCep(text);
    }
  };

  const handleSalvar = async () => {
    if (!nome || !endereco || !cidade || !estado) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/imoveis', {
        nome,
        endereco,
        cidade,
        estado,
        cep: cep || null,
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.detail || 'Erro ao criar imóvel');
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
          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: Edifício Central"
          />

          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Ex: Rua das Flores, 123"
          />

          <Text style={styles.label}>Cidade *</Text>
          <TextInput
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            placeholder="Ex: São Paulo"
          />

          <Text style={styles.label}>Estado *</Text>
          <TextInput
            style={styles.input}
            value={estado}
            onChangeText={setEstado}
            placeholder="Ex: SP"
            maxLength={2}
            autoCapitalize="characters"
          />

          <Text style={styles.label}>CEP</Text>
          <TextInput
            style={styles.input}
            value={cep}
            onChangeText={handleCepChange}
            placeholder="Ex: 01234-567"
            keyboardType="numeric"
            maxLength={9}
          />
          <Text style={styles.helper}>Digite o CEP para buscar o endereço automaticamente</Text>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSalvar}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Salvando...' : 'Salvar Imóvel'}
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
    backgroundColor: '#DC2626',
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
  helper: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
