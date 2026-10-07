import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Finalizar compra</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Opções de Entrega e Pagamento */}
        <TouchableOpacity style={styles.rowItem}>
          <Text style={styles.rowLabel}>ENTREGA</Text>
          <Text style={styles.rowValueMuted}>Adicionar endereço de entrega ›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowItem}>
          <Text style={styles.rowLabel}>FRETE</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.rowValue}>R$7,96 ›</Text>
            <Text style={styles.subDetail}>Padrão | 45-55 min</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowItem}>
          <Text style={styles.rowLabel}>PAGAMENTO</Text>
          <Text style={styles.rowValue}>PIX ›</Text>
        </TouchableOpacity>

        {/* Lista de Itens */}
        <View style={styles.tableHeader}>
          <Text style={styles.colLabel}>ITENS</Text>
          <Text style={styles.colLabel}>DESCRIÇÃO</Text>
          <Text style={styles.colLabel}>PREÇO</Text>
        </View>

        <View style={styles.itemRow}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200' }} style={styles.itemThumb} />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={styles.itemTitle}>Sushi Nigiri</Text>
            <Text style={styles.itemSub}>20 deliciosas peças...</Text>
            <Text style={styles.itemSub}>Quantidade: 01</Text>
          </View>
          <Text style={styles.itemPrice}>R$19,98</Text>
        </View>

        <View style={styles.itemRow}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1581781870027-04212e2311ac?w=200' }} style={styles.itemThumb} />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={styles.itemTitle}>Dango</Text>
            <Text style={styles.itemSub}>3 espetos de dango...</Text>
            <Text style={styles.itemSub}>Quantidade: 02</Text>
          </View>
          <Text style={styles.itemPrice}>R$19,96</Text>
        </View>

        {/* Resumo Financeiro */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal (3)</Text>
            <Text style={styles.summaryText}>R$39,94</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total do frete</Text>
            <Text style={styles.summaryText}>R$7,96</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>R$47,90</Text>
          </View>
        </View>

        {/* Botão Fazer Pedido */}
        <TouchableOpacity style={styles.orderBtn}>
          <Text style={styles.orderBtnText}>Fazer pedido</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  rowLabel: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  rowValueMuted: { fontSize: 12, color: '#888' },
  rowValue: { fontSize: 12, fontWeight: 'bold', color: '#000' },
  subDetail: { fontSize: 11, color: '#666' },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 12 },
  colLabel: { fontSize: 11, fontWeight: 'bold', color: '#888' },
  itemRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'center' },
  itemThumb: { width: 60, height: 60, borderRadius: 8 },
  itemTitle: { fontSize: 13, fontWeight: 'bold' },
  itemSub: { fontSize: 11, color: '#666' },
  itemPrice: { fontSize: 13, fontWeight: 'bold' },
  summaryContainer: { marginTop: 20, borderTopWidth: 1, borderColor: '#F0F0F0', paddingTop: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryText: { fontSize: 13, color: '#444' },
  totalText: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  orderBtn: { height: 48, backgroundColor: '#000', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  orderBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});