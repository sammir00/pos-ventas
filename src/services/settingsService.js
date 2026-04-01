import { supabase } from '../lib/supabaseClient';

export async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*');

  if (error) throw error;

  // Convertir array a objeto { key: value }
  const settingsMap = {};
  data.forEach(s => {
    settingsMap[s.key] = s.value;
  });
  return settingsMap;
}

export async function updateSetting(key, value) {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

  if (error) throw error;
}

export async function updateSettings(settingsObj) {
  const updates = Object.entries(settingsObj).map(([key, value]) => ({
    key,
    value: String(value),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('settings')
    .upsert(updates, { onConflict: 'key' });

  if (error) throw error;
}
