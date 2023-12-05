interface DataMap {
  type: string;
  sourceStart: number;
  sourceEnd: number;
  range: number;
  destinationStart: number;
  destinationOffset: number;
}

function extractDataMap(data: string) {
  const out: DataMap[] = [];
  let type = 'noType';
  data.split('\n').forEach((x, index) => {
    if (index === 0) {
      type = x.replace(' map:', '');
    } else if (x !== '') {
      const [dest, source, range] = x.split(' ').map((e) => parseInt(e, 10));
      out.push({
        type,
        destinationOffset: dest - source,
        destinationStart: dest,
        range,
        sourceEnd: source + range - 1,
        sourceStart: source,
      });
    }
  });

  return out;
}

function resolveMappedValue(source: number, map: DataMap[]) {
  const fromMap = map.find(
    (c) => source >= c.sourceStart && source <= c.sourceEnd,
  );
  if (fromMap) {
    return source + fromMap.destinationOffset;
  }
  return source;
}

export { extractDataMap, resolveMappedValue, DataMap };
