import type { TSet } from '@tcg';

import { Text, Select } from '@forms/advanced-inputs';
import groupSetsBySeries from '@lib/group-sets';
import getTypes from '@lib/get-types';
import getData from '@lib/get-data';

export default async function AdvancedSearch() {
  const _types = getTypes('types');
  const _subtypes = getTypes('subtypes');
  const _supertypes = getTypes('supertypes');
  const _rarities = getTypes('rarities');
  const _sets = getData<TSet>('sets', null, {
    pageSize: '250',
    page: '1',
    select: ['name', 'id', 'series'],
    orderBy: ['series', 'name'],
  });

  const [types, subtypes, supertypes, rarities, sets] = await Promise.all([
    _types,
    _subtypes,
    _supertypes,
    _rarities,
    _sets,
  ]);

  const { setsBySeries: series } = groupSetsBySeries(sets.data);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="cards">Cards</label>
        <Text
          id="cards"
          name="cards"
          className="rounded-md bg-transparent border-solid border-tw-gray border-2 p-2 text-white"
          placeholder="venusaur, pikachu, gardenia"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="artists">Artists</label>
        <Text
          id="artists"
          name="artists"
          className="rounded-md bg-transparent border-solid border-tw-gray border-2 p-2 text-white"
          placeholder="5ban Graphics, Masakazu Fukuda"
        />
      </div>
      <Select id="types" name="types" multiple>
        {types?.data.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </Select>
      <Select id="supertypes" name="supertypes" multiple>
        {supertypes?.data.map((supertype) => (
          <option
            value={supertype}
            key={supertype}
            className="flex items-center gap-2 px-2"
          >
            {supertype}
          </option>
        ))}
      </Select>
      <Select id="subtypes" name="subtypes" multiple>
        {subtypes?.data.map((subtype) => (
          <option
            value={subtype}
            key={subtype}
            className="flex items-center gap-2 px-2"
          >
            {subtype}
          </option>
        ))}
      </Select>
      <Select id="rarities" name="rarities" multiple>
        {rarities?.data.map((rarity) => (
          <option
            value={rarity}
            key={rarity}
            className="flex items-center gap-2 px-2"
          >
            {rarity}
          </option>
        ))}
      </Select>
      <div className="flex text-white col-span-2 flex-col gap-2 bg-transparent">
        <label className="capitalize" htmlFor="sets">
          sets
        </label>
        <select
          id="sets"
          name="sets"
          multiple
          className="py-2 min-h-[128px] px-px bg-transparent border border-solid border-2 border-tw-gray rounded-md"
        >
          {series.map(([serie, sets]) => (
            <optgroup
              key={serie}
              label={`--- ${serie} ---`}
              className="font-bold"
            >
              {sets.map((set) => {
                return (
                  <option
                    value={set.id}
                    key={set.id}
                    className="flex font-normal font-montserrat items-center gap-2 px-2"
                  >
                    {set.name}
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
