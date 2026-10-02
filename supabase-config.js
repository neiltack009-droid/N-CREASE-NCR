// N-CREASE — Supabase config for "Share with Friends"
//
// Setup steps:
// 1. Create a project at https://supabase.com
// 2. Paste your Project URL + anon public key below (Settings → API)
// 3. Run supabase-schema.sql in the SQL Editor
// 4. Optional, for a real product photo in WhatsApp/Instagram previews:
//    deploy supabase-share-preview-function.ts and fill in EDGE_FUNCTION_BASE + SITE_URL.
//    Until then, sharing still works fully — the link just opens the site directly
//    and shows the site's generic preview image instead of the specific product.

export const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
export const SUPABASE_ANON_KEY = 'YOUR-ANON-PUBLIC-KEY';
export const EDGE_FUNCTION_BASE = ''; // e.g. 'https://YOUR-PROJECT.supabase.co/functions/v1'
export const SITE_URL = ''; // e.g. 'https://n-crease.com' — your live site root

let _client = null;
let _clientPromise = null;

export function isConfigured() {
  return SUPABASE_URL.indexOf('YOUR-PROJECT') === -1;
}

export async function getSupabase() {
  if (!isConfigured()) return null;
  if (_client) return _client;
  if (!_clientPromise) {
    _clientPromise = import('https://esm.sh/@supabase/supabase-js@2').then(function (mod) {
      _client = mod.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return _client;
    });
  }
  return _clientPromise;
}

export function getAnonId() {
  try {
    var id = localStorage.getItem('ncrease-anon-id');
    if (!id) {
      id = (window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : (String(Date.now()) + Math.random().toString(16).slice(2));
      localStorage.setItem('ncrease-anon-id', id);
    }
    return id;
  } catch (e) { return 'anon'; }
}
