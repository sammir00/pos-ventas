import { supabase } from '../lib/supabaseClient';

export async function getCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function createCustomer(customer) {
  const { data, error } = await supabase
    .from('customers')
    .insert([{
      name: customer.name,
      email: customer.email || null,
      phone: customer.phone || null,
      points: customer.points || 0,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(id, updates) {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCustomer(id) {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
