import { supabase } from '../lib/supabaseClient';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  // Siempre incluir "Todos" al inicio
  return ['Todos', ...data.map(c => c.name)];
}
