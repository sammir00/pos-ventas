import { supabase } from '../lib/supabaseClient';
import { updateStock } from './productService';

export async function getTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      transaction_items (*)
    `)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTransactionById(id) {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      transaction_items (*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createTransaction({ subtotal, tax, total, customerName, paymentMethod, items }) {
  // 1. Generar número de ticket
  const { data: ticketData, error: ticketError } = await supabase
    .rpc('generate_ticket_number');

  if (ticketError) throw ticketError;

  const ticketNumber = ticketData;

  // 2. Insertar transacción
  const { data: transaction, error: txError } = await supabase
    .from('transactions')
    .insert([{
      ticket_number: ticketNumber,
      date: new Date().toISOString(),
      subtotal,
      tax,
      total,
      customer_name: customerName || 'Consumidor Final',
      payment_method: paymentMethod || 'Efectivo',
    }])
    .select()
    .single();

  if (txError) throw txError;

  // 3. Insertar items de la transacción
  const transactionItems = items.map(item => ({
    transaction_id: transaction.id,
    product_id: item.id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('transaction_items')
    .insert(transactionItems);

  if (itemsError) throw itemsError;

  // 4. Actualizar stock de cada producto
  for (const item of items) {
    await updateStock(item.id, item.quantity);
  }

  return transaction;
}
