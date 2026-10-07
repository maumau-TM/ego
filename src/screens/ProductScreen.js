import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductScreen({ route, navigation }) {
  const [quantity, setQuantity] = useState(1);
  const product = route.params?.product || {
    title: 'Lámen',
    rating: 4.2,
    price: 26.98,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    description: 'Um caldo rico e encorpado, preparado lentamente com ossos, legumes e especiarias, servido com macarrão artesanal cozido no ponto perfeito...'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header de Imagem */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn}>
            <Ionicons name="heart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Informações do Prato */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Reviews')}>
              <Text style={styles.title}>{product.title} <Text style={styles.star}>★ {product.rating}</Text></Text>
            </TouchableOpacity>
            
            {/* Seletor de Quantidade */}
            <View style={styles.quantityRow}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Ionicons name="remove-circle-outline" size={26} color="#888" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="add-circle-outline" size={26} color="#2E7D32" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.price}>R${product.price.toFixed(2)}</Text>

          <Text style={styles.descTitle}>Descrição</Text>
          <Text style={styles.description}>
            {product.description} <Text style={styles.readMore}>Ler mais</Text>
          </Text>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cartButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.cartBtnText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buyButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.buyBtnText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageContainer: { position: 'relative', width: '100%', height: 320 },
  image: { width: '100%', height: '100%', borderBottomLeftRadius: 100, borderBottomRightRadius: 100 },
  backBtn: { position: 'absolute', top: 20, left: 20, backgroundColor: '#A85A48', borderRadius: 20, padding: 8 },
  favBtn: { position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 8 },
  infoContainer: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  star: { color: '#E6A100', fontSize: 16 },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  quantityText: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  descTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, textAlign: 'center' },
  description: { color: '#666', fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  readMore: { color: '#A85A48', fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  cartButton: { flex: 1, height: 44, backgroundColor: '#000', borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  cartBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  buyButton: { width: 100, height: 44, backgroundColor: '#A85A48', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  buyBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 }
});