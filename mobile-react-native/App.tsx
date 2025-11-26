import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ImovelScreen from './src/screens/ImovelScreen';
import NovoImovelScreen from './src/screens/NovoImovelScreen';
import NovaUnidadeScreen from './src/screens/NovaUnidadeScreen';
import NovoLocatarioScreen from './src/screens/NovoLocatarioScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { isAuthenticated, loading } = useAuth();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? '#1F2937' : '#DC2626' }}>
        <ActivityIndicator size="large" color={isDark ? '#DC2626' : '#000000'} />
      </View>
    );
  }

  const navigationTheme = isDark ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#DC2626',
      background: '#1F2937',
      card: '#111827',
      text: '#F9FAFB',
    },
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#DC2626',
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Imovel"
              component={ImovelScreen}
              options={{ title: 'Detalhes do Imóvel' }}
            />
            <Stack.Screen
              name="NovoImovel"
              component={NovoImovelScreen}
              options={{ title: 'Novo Imóvel' }}
            />
            <Stack.Screen
              name="NovaUnidade"
              component={NovaUnidadeScreen}
              options={{ title: 'Nova Unidade' }}
            />
            <Stack.Screen
              name="NovoLocatario"
              component={NovoLocatarioScreen}
              options={{ title: 'Novo Locatário' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar style="auto" />
        <Navigation />
      </AuthProvider>
    </ThemeProvider>
  );
}
