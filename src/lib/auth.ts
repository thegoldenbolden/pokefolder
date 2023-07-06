import { cache } from 'react';
import { currentUser } from '@clerk/nextjs';

export const getUser = cache(async () => {
  return currentUser();
});
