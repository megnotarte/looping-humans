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

/**
 * Create a new session (admin only)
 * @returns {Promise<Object|null>} Created session object
 */
export async function createSession() {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        started_at: new Date().toISOString(),
        is_active: true,
        participants_count: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
}

/**
 * End the current active session (admin only)
 * @param {number} sessionId - Session ID to end
 * @returns {Promise<boolean>} Success status
 */
export async function endSession(sessionId) {
  try {
    const { error } = await supabase
      .from('sessions')
      .update({
        ended_at: new Date().toISOString(),
        is_active: false
      })
      .eq('id', sessionId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error ending session:', error);
    return false;
  }
}

/**
 * Get the current active session
 * @returns {Promise<Object|null>} Active session object
 */
export async function getActiveSession() {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('is_active', true)
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  } catch (error) {
    console.error('Error fetching active session:', error);
    return null;
  }
}

/**
 * Increment participant count for a session
 * @param {number} sessionId - Session ID to increment
 * @returns {Promise<boolean>} Success status
 */
export async function incrementParticipantCount(sessionId) {
  try {
    // First get current count
    const { data: session, error: fetchError } = await supabase
      .from('sessions')
      .select('participants_count')
      .eq('id', sessionId)
      .single();

    if (fetchError) throw fetchError;

    // Increment count
    const { error: updateError } = await supabase
      .from('sessions')
      .update({ participants_count: session.participants_count + 1 })
      .eq('id', sessionId);

    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error('Error incrementing participant count:', error);
    return false;
  }
}

/**
 * Get all past sessions (for history)
 * @param {number} limit - Number of sessions to retrieve
 * @returns {Promise<Array>} Array of session objects
 */
export async function getPastSessions(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching past sessions:', error);
    return [];
  }
}

/**
 * Subscribe to session changes
 * @param {Function} callback - Called when sessions change
 * @returns {Object} Subscription object
 */
export function subscribeToSessions(callback) {
  return supabase
    .channel('sessions_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'sessions'
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
}
