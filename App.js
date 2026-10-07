import React, { useState, createContext, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ==========================================
// 1. MOCK DATA (DADOS DO APLICATIVO)
// ==========================================
const DISHES_DATA = [
  {
    id: '1',
    category: 'Lámen',
    name: 'Shoyu Tonkotsu Lámen',
    subtitle: 'Caldo denso de porco 18h com massa artesanal',
    price: 58.9,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    description: 'Nosso lámen autoral com caldo de osso suíno cozido lentamente por 18 horas, servido com chashu fatiado (barriga de porco), ovo ajitama caipira, nori, broto de bambu (menma) e cebolinha fresca.',
    ingredients: ['Chashu Suíno', 'Ovo Ajitama', 'Massa Fresca', 'Nori', 'Menma'],
    isPopular: true,
  },
  {
    id: '2',
    category: 'Lámen',
    name: 'Spicy Truffled Miso Lámen',
    subtitle: 'Miso picante artesanal com azeite de trufas',
    price: 64.0,
    rating: 5.0,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=800&q=80',
    description: 'Combinação perfeita de especiarias asiáticas, pasta de miso vermelho maturado, toques delicados de trufa negra e carne suína moída temperada.',
    ingredients: ['Miso Trufado', 'Pimenta Szechuan', 'Ovo Ajitama', 'Shitake'],
    isPopular: true,
  },
  {
    id: '3',
    category: 'Gourmet',
    name: 'Wagyu Burger Ego',
    subtitle: '180g de Wagyu A5 no pão brioche com cheddar inglês',
    price: 72.0,
    rating: 4.8,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Hambúrguer de Wagyu certificado, queijo cheddar maturado, cebola caramelizada no molho tare e maionese de alho negro em pão brioche tostado na manteiga.',
    ingredients: ['Wagyu A5 180g', 'Cheddar Inglês', 'Maionese Alho Negro', 'Brioche'],
    isPopular: false,
  },
  {
    id: '4',
    category: 'Sushi',
    name: 'Combo Aburi Nigiri (8 un)',
    subtitle: 'Nigiris maçaricados com azeite trufado e flor de sal',
    price: 88.0,
    rating: 4.9,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    description: 'Seleção de nigiris de Salmão, Barriga de Salmão e Tuna maçaricados na hora com flor de sal e gotas de limão siciliano.',
    ingredients: ['Salmão', 'Atum', 'Azeite Trufado', 'Flor de Sal'],
    isPopular: true,
  },
  {
    id: '5',
    category: 'Sobremesas',
    name: 'Matcha Lava Cake',
    subtitle: 'Bolo quente de chá verde com sorvete de gergelim',
    price: 32.0,
    rating: 4.7,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    description: 'Petit gâteau de Matcha Uji cerimonial recheado com calda cremosa fluida, servido acompanhado de gelato de gergelim preto artesanal.',
    ingredients: ['Matcha Uji', 'Chocolate Branco', 'Gelato Gergelim'],
    isPopular: false,
  },
];

const REVIEWS_DATA = [
  {
    id: 'r1',
    user: 'Matheus Silva',
    rating: 5,
    date: 'Hoje',
    comment: 'O melhor Tonkotsu Lámen que já comi na cidade! O caldo tem um sabor extremamente rico e o ovo no ponto perfeito.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'r2',
    user: 'Camila Rocha',
    rating: 5,
    date: 'Ontem',
    comment: 'Atendimento impecável e o Spicy Truffled Miso é divino! Chegou super quente e bem embalado.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'r3',
    user: 'Lucas Mendes',
    rating: 4,
    date: '3 dias atrás',
    comment: 'Ingredientes visivelmente frescos e apresentação de restaurante Michelin. Vale cada centavo.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
  },
];

// ==========================================
// 2. APP CONTEXT (CARRINHO & USUÁRIO)
// ==========================================
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Cliente Gourmet', tableOrAddress: 'Mesa 04' });
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(['1', '4']);

  const addToCart = (dish, quantity = 1, options = []) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { ...dish, quantity, options }];
    });
  };

  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  const updateQuantity = (dishId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === dishId) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (dishId) => {
    setFavorites((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// ==========================================
// 3. TELAS (SCREENS)
// ==========================================

// --- 3.1 TELA DE CADASTRO / BOAS-VINDAS ---
function RegisterScreen({ navigation }) {
  const { setUser } = useApp();
  const [nameInput, setNameInput] = useState('');
  const [tableInput, setTableInput] = useState('');

  const handleStart = () => {
    if (nameInput.trim()) {
      setUser({
        name: nameInput,
        tableOrAddress: tableInput || 'Mesa 01',
      });
    }
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.containerDark}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.registerContent}>
        <View style={styles.logoSection}>
          <View style={styles.badgeIcon}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={38} color="#D4AF37" />
          </View>
          <Text style={styles.brandTitle}>EGO GOURMET</Text>
          <Text style={styles.brandSubtitle}>Alta Gastronomia Asiática & Autoral</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formHeader}>Bem-vindo à experiência</Text>
          <Text style={styles.formSub}>Identifique-se para iniciar seu pedido exclusivo.</Text>

          <Text style={styles.label}>SEU NOME</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Matheus Oliveira"
            placeholderTextColor="#666"
            value={nameInput}
            onChangeText={setNameInput}
          />

          <Text style={styles.label}>NÚMERO DA MESA OU ENDEREÇO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Mesa 04 ou Rua Oscar Freire, 100"
            placeholderTextColor="#666"
            value={tableInput}
            onChangeText={setTableInput}
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
            <Text style={styles.primaryButtonText}>ACESSAR CARDÁPIO</Text>
            <Ionicons name="arrow-forward" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- 3.2 TELA PRINCIPAL (HOME) ---
function HomeScreen({ navigation }) {
  const { user, cartCount, favorites, toggleFavorite, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Lámen', 'Sushi', 'Gourmet', 'Sobremesas'];

  const filteredDishes = DISHES_DATA.filter((dish) => {
    const matchesCategory = selectedCategory === 'Todos' || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.containerDark}>
      <StatusBar barStyle="light-content" />

      {/* Header Topo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Olá, {user.name}</Text>
          <Text style={styles.locationText}>
            <Ionicons name="location-sharp" size={14} color="#D4AF37" /> {user.tableOrAddress}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartBadgeBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Ionicons name="bag-handle-outline" size={26} color="#FFF" />
          {cartCount > 0 && (
            <View style={styles.cartBadgeCount}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar prato, ingredientes ou bebidas..."
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Destaque */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTag}>ESPECIAL DO CHEF</Text>
            <Text style={styles.bannerTitle}>Festival Tonkotsu & Miso</Text>
            <Text style={styles.bannerSub}>Desfrute da essência de Kyoto no Ego Gourmet.</Text>
          </View>
        </View>

        {/* Categorias Filtros */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScrollView}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de Pratos */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pratos & Experiências</Text>
          <Text style={styles.sectionSub}>{filteredDishes.length} itens encontrados</Text>
        </View>

        {filteredDishes.map((dish) => {
          const isFav = favorites.includes(dish.id);
          return (
            <TouchableOpacity
              key={dish.id}
              style={styles.dishCard}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('Product', { dish })}
            >
              <Image source={{ uri: dish.image }} style={styles.dishImage} />

              <TouchableOpacity
                style={styles.favButton}
                onPress={() => toggleFavorite(dish.id)}
              >
                <Ionicons
                  name={isFav ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFav ? '#E63946' : '#FFF'}
                />
              </TouchableOpacity>

              <View style={styles.dishInfo}>
                <View style={styles.dishHeaderRow}>
                  <Text style={styles.dishTitle}>{dish.name}</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={13} color="#FFC107" />
                    <Text style={styles.ratingText}>{dish.rating}</Text>
                  </View>
                </View>

                <Text style={styles.dishSubtitle} numberOfLines={2}>
                  {dish.subtitle}
                </Text>

                <View style={styles.dishFooterRow}>
                  <Text style={styles.dishPrice}>R$ {dish.price.toFixed(2).replace('.', ',')}</Text>

                  <TouchableOpacity
                    style={styles.quickAddBtn}
                    onPress={() => {
                      addToCart(dish, 1);
                      Alert.alert('Ego Gourmet', `${dish.name} adicionado ao carrinho!`);
                    }}
                  >
                    <Ionicons name="add" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- 3.3 TELA DETALHES DO PRATO (PRODUCT SCREEN) ---
function ProductScreen({ route, navigation }) {
  const { dish } = route.params;
  const { addToCart, favorites, toggleFavorite } = useApp();
  const [quantity, setQuantity] = useState(1);
  const isFav = favorites.includes(dish.id);

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.containerDark}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Imagem do Prato */}
        <View style={styles.productHeroContainer}>
          <Image source={{ uri: dish.image }} style={styles.productHeroImage} />
          
          <TouchableOpacity
            style={styles.backButtonCircle}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favButtonCircle}
            onPress={() => toggleFavorite(dish.id)}
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={22}
              color={isFav ? '#E63946' : '#FFF'}
            />
          </TouchableOpacity>
        </View>

        {/* Detalhes Conteúdo */}
        <View style={styles.productDetailsBox}>
          <View style={styles.productHeaderRow}>
            <Text style={styles.productCategory}>{dish.category.toUpperCase()}</Text>
            <TouchableOpacity
              style={styles.reviewsLink}
              onPress={() => navigation.navigate('Reviews', { dish })}
            >
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.reviewsLinkText}>
                {dish.rating} ({dish.reviewsCount} avaliações)
              </Text>
              <Ionicons name="chevron-forward" size={14} color="#D4AF37" />
            </TouchableOpacity>
          </View>

          <Text style={styles.productTitle}>{dish.name}</Text>
          <Text style={styles.productDescription}>{dish.description}</Text>

          {/* Ingredientes */}
          <Text style={styles.sectionSubtitle}>INGREDIENTES SELECIONADOS</Text>
          <View style={styles.ingredientsRow}>
            {dish.ingredients.map((item, index) => (
              <View key={index} style={styles.ingredientTag}>
                <Ionicons name="checkmark-circle" size={14} color="#D4AF37" style={{ marginRight: 4 }} />
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Controle de Quantidade */}
          <Text style={styles.sectionSubtitle}>QUANTIDADE</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Ionicons name="remove" size={20} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{quantity}</Text>

            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => q + 1)}>
              <Ionicons name="add" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Botão Fixo Inferior */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPriceLabel}>TOTAL DO PRATO</Text>
          <Text style={styles.bottomPriceValue}>
            R$ {(dish.price * quantity).toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartBtnText}>ADICIONAR</Text>
          <Ionicons name="cart-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- 3.4 TELA DE AVALIAÇÕES (REVIEWS SCREEN) ---
function ReviewsScreen({ route, navigation }) {
  const { dish } = route.params;

  return (
    <SafeAreaView style={styles.containerDark}>
      <StatusBar barStyle="light-content" />
      <View style={styles.simpleHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.simpleHeaderTitle}>Avaliações dos Clientes</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Score Card */}
        <View style={styles.reviewScoreCard}>
          <Text style={styles.scoreBig}>{dish.rating}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={18} color="#FFC107" />
            ))}
          </View>
          <Text style={styles.scoreSub}>Baseado em {dish.reviewsCount} experiências de clientes</Text>
        </View>

        <Text style={styles.sectionSubtitle}>DEPOIMENTOS RECENTES</Text>

        {REVIEWS_DATA.map((item) => (
          <View key={item.id} style={styles.reviewCard}>
            <View style={styles.reviewUserRow}>
              <Image source={{ uri: item.avatar }} style={styles.reviewAvatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.reviewUserName}>{item.user}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
              <View style={styles.reviewCardStars}>
                <Ionicons name="star" size={14} color="#FFC107" />
                <Text style={styles.reviewCardRating}>{item.rating}.0</Text>
              </View>
            </View>
            <Text style={styles.reviewComment}>{item.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// --- 3.5 TELA DE CHECKOUT & CARRINHO ---
function CheckoutScreen({ navigation }) {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, user } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const deliveryFee = cart.length > 0 ? 12.0 : 0.0;
  const finalTotal = cartTotal + deliveryFee;

  const handleFinishOrder = () => {
    if (cart.length === 0) return;
    setSuccessModalVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessModalVisible(false);
    clearCart();
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.containerDark}>
      <StatusBar barStyle="light-content" />
      <View style={styles.simpleHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.simpleHeaderTitle}>Seu Pedido / Carrinho</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCartBox}>
          <MaterialCommunityIcons name="cart-off" size={64} color="#444" />
          <Text style={styles.emptyCartTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.emptyCartSub}>Adicione alguns pratos especiais do nosso cardápio.</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.primaryButtonText}>VER CARDÁPIO</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
          {/* Itens do Pedido */}
          <Text style={styles.sectionSubtitle}>ITENS SELECIONADOS</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItemCard}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <Text style={styles.cartItemTitle}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </Text>

                <View style={styles.cartItemQtyControls}>
                  <TouchableOpacity
                    style={styles.cartQtyBtn}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Ionicons name="remove" size={14} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.cartQtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.cartQtyBtn}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Ionicons name="add" size={14} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#E63946" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Endereço / Local */}
          <Text style={styles.sectionSubtitle}>LOCAL DE ENTREGA / MESA</Text>
          <View style={styles.infoTile}>
            <Ionicons name="location" size={20} color="#D4AF37" />
            <Text style={styles.infoTileText}>{user.tableOrAddress}</Text>
          </View>

          {/* Pagamento */}
          <Text style={styles.sectionSubtitle}>FORMA DE PAGAMENTO</Text>
          <View style={styles.paymentRow}>
            <TouchableOpacity
              style={[styles.paymentChip, paymentMethod === 'pix' && styles.paymentChipActive]}
              onPress={() => setPaymentMethod('pix')}
            >
              <FontAwesome5
                name="pix"
                size={18}
                color={paymentMethod === 'pix' ? '#D4AF37' : '#888'}
              />
              <Text
                style={[
                  styles.paymentChipText,
                  paymentMethod === 'pix' && styles.paymentChipTextActive,
                ]}
              >
                PIX
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentChip,
                paymentMethod === 'card' && styles.paymentChipActive,
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <Ionicons
                name="card-outline"
                size={18}
                color={paymentMethod === 'card' ? '#D4AF37' : '#888'}
              />
              <Text
                style={[
                  styles.paymentChipText,
                  paymentMethod === 'card' && styles.paymentChipTextActive,
                ]}
              >
                Cartão
              </Text>
            </TouchableOpacity>
          </View>

          {/* Resumo Financeiro */}
          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de Serviço / Entrega</Text>
              <Text style={styles.summaryValue}>
                R$ {deliveryFee.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowTotal]}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>
                R$ {finalTotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={handleFinishOrder}>
            <Text style={styles.checkoutBtnText}>CONFIRMAR PEDIDO</Text>
            <Ionicons name="checkmark-circle" size={22} color="#000" />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Modal de Pedido Concluído */}
      <Modal visible={isSuccessModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={72} color="#D4AF37" />
            <Text style={styles.modalTitle}>Pedido Recebido!</Text>
            <Text style={styles.modalSub}>
              O Chef já está preparando seus pratos com todo o cuidado e requinte.
            </Text>

            <TouchableOpacity style={styles.primaryButton} onPress={handleCloseSuccess}>
              <Text style={styles.primaryButtonText}>VOLTAR À HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// 4. CONFIGURAÇÃO DE NAVEGAÇÃO
// ==========================================
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Register"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

// ==========================================
// 5. ESTILOS (STYLESHEET)
// ==========================================
const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#0F1015',
  },
  // Rego/Register
  registerContent: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  badgeIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1A1B23',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginBottom: 12,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D4AF37',
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#A0A5B5',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  formHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  formSub: {
    fontSize: 13,
    color: '#888',
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D4AF37',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#0F1015',
    color: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2D2F3D',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 14,
    marginRight: 8,
    letterSpacing: 1,
  },

  // Header & Home
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  locationText: {
    fontSize: 13,
    color: '#A0A5B5',
    marginTop: 2,
  },
  cartBadgeBtn: {
    position: 'relative',
    padding: 6,
  },
  cartBadgeCount: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#E63946',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2D2F3D',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
  },
  bannerContainer: {
    marginHorizontal: 20,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  bannerTag: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  bannerSub: {
    color: '#DDD',
    fontSize: 12,
  },
  catScrollView: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: '#1A1B23',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  categoryChipActive: {
    backgroundColor: '#D4AF37',
    borderColor: '#D4AF37',
  },
  categoryChipText: {
    color: '#A0A5B5',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#000',
    fontWeight: '800',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  sectionSub: {
    fontSize: 12,
    color: '#777',
  },

  // Prato Card
  dishCard: {
    backgroundColor: '#1A1B23',
    marginHorizontal: 20,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  dishImage: {
    width: '100%',
    height: 160,
  },
  favButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  dishInfo: {
    padding: 14,
  },
  dishHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1015',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  dishSubtitle: {
    fontSize: 12,
    color: '#888',
    marginVertical: 6,
  },
  dishFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dishPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D4AF37',
  },
  quickAddBtn: {
    backgroundColor: '#D4AF37',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Detalhes Prato
  productHeroContainer: {
    position: 'relative',
    height: 320,
  },
  productHeroImage: {
    width: '100%',
    height: '100%',
  },
  backButtonCircle: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButtonCircle: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDetailsBox: {
    padding: 20,
  },
  productHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCategory: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  reviewsLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsLinkText: {
    color: '#FFF',
    fontSize: 13,
    marginHorizontal: 4,
    fontWeight: '600',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#AAA',
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D4AF37',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 10,
  },
  ingredientsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  ingredientText: {
    color: '#FFF',
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  qtyBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#2D2F3D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyNumber: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1A1B23',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2D2F3D',
  },
  bottomPriceLabel: {
    fontSize: 10,
    color: '#888',
    fontWeight: '800',
  },
  bottomPriceValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#D4AF37',
  },
  addToCartBtn: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 14,
    marginRight: 8,
  },

  // Simple Header
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1B23',
  },
  simpleHeaderTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },

  // Reviews
  reviewScoreCard: {
    backgroundColor: '#1A1B23',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  scoreBig: {
    fontSize: 48,
    fontWeight: '900',
    color: '#D4AF37',
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  scoreSub: {
    color: '#888',
    fontSize: 12,
  },
  reviewCard: {
    backgroundColor: '#1A1B23',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewUserName: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  reviewDate: {
    color: '#666',
    fontSize: 11,
  },
  reviewCardStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCardRating: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewComment: {
    color: '#DDD',
    fontSize: 13,
    marginTop: 10,
    lineHeight: 18,
  },

  // Checkout
  emptyCartBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 16,
  },
  emptyCartSub: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
  },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemTitle: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  cartItemPrice: {
    color: '#D4AF37',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 2,
  },
  cartItemQtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  cartQtyBtn: {
    backgroundColor: '#2D2F3D',
    borderRadius: 4,
    padding: 4,
  },
  cartQtyText: {
    color: '#FFF',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  infoTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B23',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  infoTileText: {
    color: '#FFF',
    marginLeft: 10,
    fontWeight: '600',
  },
  paymentRow: {
    flexDirection: 'row',
  },
  paymentChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1B23',
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  paymentChipActive: {
    borderColor: '#D4AF37',
    backgroundColor: '#26241E',
  },
  paymentChipText: {
    color: '#888',
    fontWeight: '700',
    marginLeft: 8,
  },
  paymentChipTextActive: {
    color: '#D4AF37',
  },
  summaryBox: {
    backgroundColor: '#1A1B23',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#2D2F3D',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryRowTotal: {
    borderTopWidth: 1,
    borderTopColor: '#2D2F3D',
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 13,
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  totalLabel: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
  totalValue: {
    color: '#D4AF37',
    fontWeight: '800',
    fontSize: 18,
  },
  checkoutBtn: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkoutBtnText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 15,
    marginRight: 8,
    letterSpacing: 1,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#1A1B23',
    width: '100%',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 16,
  },
  modalSub: {
    fontSize: 13,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 20,
  },
});