export const CATEGORIES = [
  { id: '1', name: 'Frios', icon: '🍙' },
  { id: '2', name: 'Quentes', icon: '🍜' },
  { id: '3', name: 'Sobremesas', icon: '🍡' },
];

export const PRODUCTS = [
  {
    id: 'lamen',
    title: 'Lámen',
    rating: 4.2,
    price: 26.98,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    description: 'Um caldo rico e encorpado, preparado lentamente com ossos, legumes e especiarias, servido com macarrão artesanal cozido no ponto perfeito...',
  },
  {
    id: 'mochi',
    title: 'Mochi',
    rating: 4.8,
    price: 7.98,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500',
    description: 'Deliciosa sobremesa tradicional japonesa feita de arroz mochi recheado.',
  },
  {
    id: 'sushi',
    title: 'Sushi Nigiri',
    rating: 4.9,
    price: 19.98,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500',
    description: '20 deliciosas peças variadas de salmão, atum e peixe branco.',
  },
  {
    id: 'dango',
    title: 'Dango',
    rating: 4.7,
    price: 19.96,
    image: 'https://images.unsplash.com/photo-1581781870027-04212e2311ac?w=500',
    description: '3 espetos de dango doce artesanal colorido.',
  }
];

export const REVIEWS = [
  {
    id: '1',
    user: 'Alan',
    rating: 4,
    date: '30/10/2025',
    comment: 'Se eu pudesse definir este lámen em uma palavra, seria "perfeição", só não dou 5 estrelas porque o motoboy cuspiu na minha cara.',
    avatar: 'https://i.pravatar.cc/100?img=12'
  },
  {
    id: '2',
    user: 'Elon',
    rating: 5,
    date: '25/10/2025',
    comment: 'Teve um dia que eu comi um lámen perto de uma empresa da concorrente, que dizia ser "de outro mundo". Mas esse sim deve ser de marte.',
    avatar: 'https://i.pravatar.cc/100?img=33'
  }
];