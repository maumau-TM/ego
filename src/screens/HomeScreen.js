import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '../mock/data';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Barra de Busca */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput placeholder="Buscar" style={{ flex: 1 }} />
        </View>

        {/* Atalhos */}
        <View style={styles.shortcutsRow}>
          <TouchableOpacity style={styles.shortcutBtn}>
            <Ionicons name="heart-outline" size={16} color="#000" />
            <Text style={styles.shortcutText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutBtn}>
            <Ionicons name="time-outline" size={16} color="#000" />
            <Text style={styles.shortcutText}>Histórico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutBtn}>
            <Ionicons name="receipt-outline" size={16} color="#000" />
            <Text style={styles.shortcutText}>Pedidos</Text>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800' }} 
            style={styles.bannerImage} 
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>SINTA O JAPÃO NA PONTA DA LÍNGUA!</Text>
          </View>
        </View>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias ›</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          <View style={styles.categoryCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=200' }} style={styles.catImage} />
            <Text style={styles.catName}>Frios</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200' }} style={styles.catImage} />
            <Text style={styles.catName}>Quentes</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200' }} style={styles.catImage} />
            <Text style={styles.catName}>Sobremesas</Text>
          </View>
        </ScrollView>

        {/* Lista Experimente */}
        <Text style={styles.sectionTitle}>Experimente e surpreenda-se ›</Text>
        <View style={styles.productsGrid}>
          {PRODUCTS.slice(0, 2).map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => navigation.navigate('Product', { product: item })}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { padding: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F3F3', borderRadius: 10, paddingHorizontal: 12, height: 42, marginBottom: 12 },
  shortcutsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  shortcutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  shortcutText: { marginLeft: 4, fontSize: 12, fontWeight: '500' },
  banner: { height: 140, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)', padding: 16, justifyContent: 'center' },
  bannerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', width: '60%' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  categoriesRow: { flexDirection: 'row', marginBottom: 20 },
  categoryCard: { alignItems: 'center', marginRight: 16 },
  catImage: { width: 70, height: 70, borderRadius: 35, marginBottom: 6 },
  catName: { fontSize: 12, fontWeight: '500' },
  productsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  productCard: { width: '48%' },
  productImage: { width: '100%', height: 120, borderRadius: 12, marginBottom: 8 },
  productTitle: { fontSize: 14, fontWeight: 'bold' },
  productPrice: { fontSize: 14, color: '#333' }
});