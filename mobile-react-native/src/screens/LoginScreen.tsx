import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, senha });
      await login(response.data.access_token);
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.detail || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const preencherUsuario = (num: number) => {
    setEmail(`usuario${num}@email.com`);
    setSenha(`usuario${num}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, isDark && styles.containerDark]}
    >
      {/* Toggle de Tema */}
      <TouchableOpacity
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <Text style={styles.themeToggleText}>{isDark ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Gerenciamento{'\n'}de Aluguéis</Text>

        <View style={[styles.form, isDark && styles.formDark]}>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="Email"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="Senha"
            placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View style={[styles.divider, isDark && styles.dividerDark]} />

          <Text style={[styles.testLabel, isDark && styles.testLabelDark]}>Usuários de teste:</Text>
          <View style={styles.testButtons}>
            <TouchableOpacity
              style={[styles.testButton, isDark && styles.testButtonDark]}
              onPress={() => preencherUsuario(1)}
            >
              <Text style={[styles.testButtonText, isDark && styles.testButtonTextDark]}>Usuário 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.testButton, isDark && styles.testButtonDark]}
              onPress={() => preencherUsuario(2)}
            >
              <Text style={[styles.testButtonText, isDark && styles.testButtonTextDark]}>Usuário 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DC2626',
  },
  containerDark: {
    backgroundColor: '#1F2937',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 25,
  },
  themeToggleText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formDark: {
    backgroundColor: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  inputDark: {
    borderColor: '#374151',
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
  },
  button: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  dividerDark: {
    backgroundColor: '#374151',
  },
  testLabel: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
  },
  testLabelDark: {
    color: '#9CA3AF',
  },
  testButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  testButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonDark: {
    backgroundColor: '#374151',
  },
  testButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  testButtonTextDark: {
    color: '#F9FAFB',
  },
});
