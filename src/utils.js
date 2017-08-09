export function groupBy(arr, prop) {
  return arr.reduce(
    function innerGroupBy(obj, el) {
      const elProp = el[prop];

      if (!(elProp in obj)) {
        obj[elProp] = [];
      }

      obj[elProp].push(el);

      return obj;
    },
    Object.create(null)
  );
}