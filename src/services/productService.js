import { supabase } from '../lib/supabaseClient';

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getProductsByCategory(category) {
  if (category === 'Todos') return getProducts();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function searchProducts(query) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('name');

  if (error) throw error;
  return data;
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      barcode: product.barcode || null,
      image_url: product.image_url || null,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updateStock(id, quantitySold) {
  // Usa RPC o actualización directa
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('stock')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  const newStock = Math.max(0, product.stock - quantitySold);

  const { error: updateError } = await supabase
    .from('products')
    .update({ stock: newStock })
    .eq('id', id);

  if (updateError) throw updateError;
}
