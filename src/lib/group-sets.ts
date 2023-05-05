import type { TSet } from '@tcg';

export default function groupSetsBySeries(sets: TSet[]) {
  const group: { [key: string]: TSet[] } = {};

  sets.map((set) => {
    if (!set.series) return;
    group[set.series] ??= [];
    group[set.series].push(set);
  });

  return {
    series: Object.keys(group),
    setsBySeries: Object.entries(group),
  };
}
