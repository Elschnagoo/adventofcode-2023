const { isMainThread, parentPort, workerData } = require ('worker_threads');

function resolveMappedValue(source , map) {
  const fromMap = map.find(
    (c) => source >= c.sourceStart && source <= c.sourceEnd,
  );
  if (fromMap) {
    return source + fromMap.destinationOffset;
  }
  return source;
}

if (!isMainThread) {
  let low = 0;

  for (const [a, b] of workerData.load ){
    const end = a + b;
    for (let j = a; j < end; j++) {
      let cur = j;
      for (const map of workerData.dataMaps) {
        cur = resolveMappedValue(cur, map);
      }
      if (low === 0 || cur < low) {
        low = cur;
      }
    }
  }



  parentPort?.postMessage(low);
}
