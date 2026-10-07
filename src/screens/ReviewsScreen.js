import React from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { REVIEWS } from '../mock/data';

export default function ReviewsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Avaliações</Text>
          <Ionicons name="options-outline" size={20} color="#000" />
        </View>

        {/* Nota Média */}
        <Text style={styles.ratingBig}>4.2 estrelas <Text style={styles.ratingSub}>de 5</Text></Text>

        {/* Barras de Estatística */}
        <View style={styles.barsContainer}>
          {[
            { star: 5, pct: '87%' },
            { star: 4, pct: '77%' },
            { star: 3, pct: '57%' },
            { star: 2, pct: '17%' },
            { star: 1, pct: '3%' },
          ].map((item) => (
            <View key={item.star} style={styles.barRow}>
              <Text style={styles.starLabel}>{item.star} ★</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: item.pct }]} />
              </View>
              <Text style={styles.pctLabel}>{item.pct}</Text>
            </View>
          ))}
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.countText}>362 avaliações</Text>
          <TouchableOpacity><Text style={styles.writeText}>Escreva uma avaliação</Text></TouchableOpacity>
        </View>

        {/* Busca em Avaliações */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#888" style={{ marginRight: 8 }} />
          <TextInput placeholder="Procure por qualquer avaliação" style={{ flex: 1 }} />
        </View>

        {/* Lista de Comentários */}
        {REVIEWS.map((rev) => (
          <View key={rev.id} style={styles.reviewCard}>
            <View style={styles.userRow}>
              <Image source={{ uri: rev.avatar }} style={styles.avatar} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.userName}>{rev.user}</Text>
                <Text style={styles.starsText}>{'★'.repeat(rev.rating)} {rev.rating}</Text>
              </View>
              <Text style={styles.dateText}>{rev.date}</Text>
            </View>
            <Text style={styles.commentText}>{rev.comment}</Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  ratingBig: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  ratingSub: { fontSize: 14, color: '#888', fontWeight: 'normal' },
  barsContainer: { marginBottom: 20 },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  starLabel: { width: 30, fontSize: 12, fontWeight: 'bold' },
  barBg: { flex: 1, height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginHorizontal: 8 },
  barFill: { height: '100%', backgroundColor: '#E6A100', borderRadius: 4 },
  pctLabel: { width: 35, fontSize: 11, color: '#666', textAlign: 'right' },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  countText: { fontSize: 16, fontWeight: 'bold' },
  writeText: { fontSize: 12, color: '#A85A48' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F3F3', borderRadius: 10, paddingHorizontal: 12, height: 40, marginBottom: 20 },
  reviewCard: { marginBottom: 20 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  userName: { fontWeight: 'bold', fontSize: 14 },
  starsText: { color: '#E6A100', fontSize: 12 },
  dateText: { color: '#888', fontSize: 11 },
  commentText: { color: '#444', fontSize: 12, lineHeight: 18 }
});