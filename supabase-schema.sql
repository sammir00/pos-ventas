-- ============================================
-- POS VENTAS - Supabase Database Schema
-- ============================================
-- Ejecutar este script en el SQL Editor de Supabase
-- https://supabase.com/dashboard → SQL Editor → New Query

-- ============================================
-- 1. TABLAS
-- ============================================

-- Categorías de productos
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Productos
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'General',
  barcode TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Clientes
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Transacciones (ventas)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT NOT NULL UNIQUE,
  date TIMESTAMPTZ NOT NULL DEFAULT now(),
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  customer_name TEXT NOT NULL DEFAULT 'Consumidor Final',
  payment_method TEXT NOT NULL DEFAULT 'Efectivo',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Items de cada transacción
CREATE TABLE IF NOT EXISTS transaction_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10, 2) NOT NULL DEFAULT 0
);

-- Configuraciones del sistema
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- 2. ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_ticket ON transactions(ticket_number);
CREATE INDEX IF NOT EXISTS idx_transaction_items_tx ON transaction_items(transaction_id);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- ============================================
-- 3. DESHABILITAR RLS (sin autenticación)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Políticas públicas (acceso total sin auth)
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on customers" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on transactions" ON transactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on transaction_items" ON transaction_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 4. FUNCIÓN: Generar número de ticket
-- ============================================

CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 5) AS INTEGER)), 1000) + 1
  INTO next_num
  FROM transactions;
  RETURN 'TRX-' || next_num;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. DATOS DE EJEMPLO (SEED)
-- ============================================

-- Categorías
INSERT INTO categories (name) VALUES
  ('Bebidas'),
  ('Panadería'),
  ('Lácteos'),
  ('Snacks'),
  ('Abarrotes'),
  ('Limpieza')
ON CONFLICT (name) DO NOTHING;

-- Productos
INSERT INTO products (name, price, stock, category, barcode, image_url) VALUES
  ('Coca Cola 2L', 2.50, 45, 'Bebidas', '770200100', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80'),
  ('Pan de Molde Blanco', 1.20, 12, 'Panadería', '770200101', 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&q=80'),
  ('Leche Entera 1L', 0.90, 30, 'Lácteos', '770200102', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80'),
  ('Galletas de Chocolate', 1.50, 50, 'Snacks', '770200103', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80'),
  ('Arroz 1kg', 1.10, 100, 'Abarrotes', '770200104', 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=300&q=80'),
  ('Aceite de Girasol 1L', 2.10, 25, 'Abarrotes', '770200105', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80'),
  ('Jabón en Polvo 1kg', 3.00, 40, 'Limpieza', '770200106', 'https://images.unsplash.com/photo-1584820927498-cafececd8f7a?w=300&q=80'),
  ('Papel Higiénico 4R', 2.20, 60, 'Limpieza', '770200107', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80');

-- Clientes
INSERT INTO customers (name, email, phone, points) VALUES
  ('Juan Pérez', 'juan@example.com', '555-0101', 150),
  ('María Garcia', 'maria@example.com', '555-0102', 300),
  ('Carlos López', 'carlos@example.com', '555-0103', 50);

-- Configuraciones por defecto
INSERT INTO settings (key, value) VALUES
  ('store_name', 'MiniMarket La Esquina'),
  ('tax_id', '123456789001'),
  ('address', 'Av. Principal 123 y Calle Secundaria'),
  ('tax_rate', '12'),
  ('currency', 'USD')
ON CONFLICT (key) DO NOTHING;

-- Transacciones de ejemplo
DO $$
DECLARE
  tx1_id UUID;
  tx2_id UUID;
  coca_id UUID;
  pan_id UUID;
  jabon_id UUID;
  papel_id UUID;
BEGIN
  -- Obtener IDs de productos
  SELECT id INTO coca_id FROM products WHERE barcode = '770200100' LIMIT 1;
  SELECT id INTO pan_id FROM products WHERE barcode = '770200101' LIMIT 1;
  SELECT id INTO jabon_id FROM products WHERE barcode = '770200106' LIMIT 1;
  SELECT id INTO papel_id FROM products WHERE barcode = '770200107' LIMIT 1;

  -- Transacción 1
  INSERT INTO transactions (ticket_number, date, subtotal, tax, total, customer_name, payment_method)
  VALUES ('TRX-1001', '2026-03-20T10:30:00Z', 3.30, 0.40, 3.70, 'Juan Pérez', 'Efectivo')
  RETURNING id INTO tx1_id;

  INSERT INTO transaction_items (transaction_id, product_id, product_name, quantity, unit_price) VALUES
    (tx1_id, coca_id, 'Coca Cola 2L', 1, 2.50),
    (tx1_id, pan_id, 'Pan de Molde Blanco', 1, 1.20);

  -- Transacción 2
  INSERT INTO transactions (ticket_number, date, subtotal, tax, total, customer_name, payment_method)
  VALUES ('TRX-1002', '2026-03-20T11:15:00Z', 4.64, 0.56, 5.20, 'Consumidor Final', 'Tarjeta')
  RETURNING id INTO tx2_id;

  INSERT INTO transaction_items (transaction_id, product_id, product_name, quantity, unit_price) VALUES
    (tx2_id, jabon_id, 'Jabón en Polvo 1kg', 1, 3.00),
    (tx2_id, papel_id, 'Papel Higiénico 4R', 1, 2.20);
END $$;

-- ============================================
-- ✅ LISTO - Esquema creado exitosamente
-- ============================================
