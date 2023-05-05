import { init } from './server-only';
import { API_URL } from './config';
import { Data } from './get-data';

type Endpoint = 'types' | 'subtypes' | 'supertypes' | 'rarities';
export default async function getTypes(
  endpoint: Endpoint,
): Promise<Data<string>> {
  const url = `${API_URL}/${endpoint}`;

  try {
    const response = await fetch(url, init);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  } catch (error) {
    console.error(`${url} encountered an error`, error);
    return {
      data: [],
      totalCount: 0,
      count: 0,
      page: 0,
      pageSize: 0,
    };
  }
}
