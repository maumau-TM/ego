import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo EGO */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoTitle}>EGO</Text>
          <Text style={styles.logoSubtitle}>ESPAÇO GOURMET ORIENTAL</Text>
        </View>

        <Text style={styles.title}>Criar uma conta</Text>
        <Text style={styles.subtitle}>Insira alguns dados para se cadastrar neste aplicativo</Text>

        <TextInput style={styles.input} placeholder="Email (xxx@domínio.com)" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="CPF (xxx.xxx.xxx-xx)" keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Ao clicar em continuar, você concorda com os nossos{' '}
          <Text style={styles.linkText}>Termos de Serviço</Text> e com a{' '}
          <Text style={styles.linkText}>Política de Privacidade</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { padding: 24, alignItems: 'center', justifyContent: 'center', flex: 1 },
  logoContainer: { alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderColor: '#A85A48', paddingBottom: 10, width: '60%' },
  logoTitle: { fontSize: 36, fontWeight: 'bold', color: '#1A1A1A', tracking: 2 },
  logoSubtitle: { fontSize: 10, color: '#A85A48', fontWeight: '600' },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', height: 48, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12, paddingHorizontal: 16, marginBottom: 12, fontSize: 14 },
  button: { width: '100%', height: 48, backgroundColor: '#000', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  termsText: { fontSize: 11, color: '#888', textAlign: 'center', marginTop: 24, paddingHorizontal: 10 },
  linkText: { color: '#000', fontWeight: 'bold' }
});