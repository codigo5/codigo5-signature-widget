export function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

export function objectAssign(target, ...sources) {
  let to = toObject(target);

  for (let s = 0; s < sources.length; s++) {
    let from = Object(sources[s]);

    for (let key in from) {
      if (from.hasOwnProperty(key)) {
        to[key] = from[key];
      }
    }

    if (Object.getOwnPropertySymbols) {
      let symbols = Object.getOwnPropertySymbols(from);

      for (let i = 0; i < symbols.length; i++) {
        if (from.propertyIsEnumerable(symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
}
