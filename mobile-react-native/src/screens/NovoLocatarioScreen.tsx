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

export default function NovoLocatarioScreen({ route, navigation }: any) {
  const { unidadeId } = route.params;
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nome || !cpf || !dataInicio) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/locatarios', {
        unidade_id: unidadeId,
        nome,
        cpf,
        telefone: telefone || null,
        email: email || null,
        data_inicio_contrato: dataInicio,
        data_fim_contrato: dataFim || null,
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.detail || 'Erro ao criar locatário');
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
          <Text style={styles.label}>Nome Completo *</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: João da Silva"
          />

          <Text style={styles.label}>CPF *</Text>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={setCpf}
            placeholder="Ex: 123.456.789-00"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Ex: (11) 98765-4321"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ex: joao@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Data Início do Contrato *</Text>
          <TextInput
            style={styles.input}
            value={dataInicio}
            onChangeText={setDataInicio}
            placeholder="AAAA-MM-DD (Ex: 2024-01-15)"
          />
          <Text style={styles.helper}>Formato: AAAA-MM-DD</Text>

          <Text style={styles.label}>Data Fim do Contrato</Text>
          <TextInput
            style={styles.input}
            value={dataFim}
            onChangeText={setDataFim}
            placeholder="AAAA-MM-DD (Ex: 2025-01-15)"
          />
          <Text style={styles.helper}>Formato: AAAA-MM-DD (opcional)</Text>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSalvar}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Salvando...' : 'Salvar Locatário'}
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
  helper: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
});
