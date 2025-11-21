import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get current event state
 * @returns {Promise<Object|null>} Event state object
 */
export async function getEventState() {
  try {
    const { data, error } = await supabase
      .from('event_state')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching event state:', error);
    return null;
  }
}

/**
 * Update event state (admin only)
 * @param {boolean} isActive - Whether event is active
 * @returns {Promise<boolean>} Success status
 */
export async function setEventState(isActive) {
  try {
    const { error } = await supabase
      .from('event_state')
      .insert({
        is_active: isActive,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error setting event state:', error);
    return false;
  }
}

/**
 * Subscribe to event state changes
 * @param {Function} callback - Called when state changes
 * @returns {Object} Subscription object
 */
export function subscribeToEventState(callback) {
  return supabase
    .channel('event_state_changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'event_state'
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
}
