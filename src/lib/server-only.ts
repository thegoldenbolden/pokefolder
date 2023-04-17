import 'server-only';

export const init: RequestInit = {
  next: { revalidate: 86400 },
  headers: {
    'X-Api-Key': `${process.env.TCG_KEY}`,
    'Content-Type': 'application/json'
  }
};
