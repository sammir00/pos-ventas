export const productsData = [
  { id: 1, name: 'Coca Cola 2L', price: 2.50, stock: 45, category: 'Bebidas', barcode: '770200100', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80' },
  { id: 2, name: 'Pan de Molde Blanco', price: 1.20, stock: 12, category: 'Panadería', barcode: '770200101', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&q=80' },
  { id: 3, name: 'Leche Entera 1L', price: 0.90, stock: 30, category: 'Lácteos', barcode: '770200102', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80' },
  { id: 4, name: 'Galletas de Chocolate', price: 1.50, stock: 50, category: 'Snacks', barcode: '770200103', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80' },
  { id: 5, name: 'Arroz 1kg', price: 1.10, stock: 100, category: 'Abarrotes', barcode: '770200104', image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=300&q=80' },
  { id: 6, name: 'Aceite de Girasol 1L', price: 2.10, stock: 25, category: 'Abarrotes', barcode: '770200105', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80' },
  { id: 7, name: 'Jabón en Polvo 1kg', price: 3.00, stock: 40, category: 'Limpieza', barcode: '770200106', image: 'https://images.unsplash.com/photo-1584820927498-cafececd8f7a?w=300&q=80' },
  { id: 8, name: 'Papel Higiénico 4R', price: 2.20, stock: 60, category: 'Limpieza', barcode: '770200107', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80' },
];

export const categoriesData = ['Todos', 'Bebidas', 'Panadería', 'Lácteos', 'Snacks', 'Abarrotes', 'Limpieza'];

export const customersData = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '555-0101', points: 150 },
  { id: 2, name: 'María Garcia', email: 'maria@example.com', phone: '555-0102', points: 300 },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com', phone: '555-0103', points: 50 },
];

export const historyData = [
  {
    id: 'TRX-1001',
    date: '2026-03-20T10:30:00',
    total: 3.70,
    items: [
      { productId: 1, quantity: 1, price: 2.50, name: 'Coca Cola 2L' },
      { productId: 2, quantity: 1, price: 1.20, name: 'Pan de Molde Blanco' },
    ],
    customer: 'Juan Pérez',
    method: 'Efectivo',
  },
  {
    id: 'TRX-1002',
    date: '2026-03-20T11:15:00',
    total: 5.20,
    items: [
      { productId: 7, quantity: 1, price: 3.00, name: 'Jabón en Polvo 1kg' },
      { productId: 8, quantity: 1, price: 2.20, name: 'Papel Higiénico 4R' },
    ],
    customer: 'Consumidor Final',
    method: 'Tarjeta',
  }
];
