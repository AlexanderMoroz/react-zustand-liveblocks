import { createClient } from '@liveblocks/client';

export const publicApiKey = import.meta.env.VITE_LIVEBLOCKS_API_KEY || '';

export const client = createClient({
  publicApiKey,
});
