// taken from: https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
function removeEmptyValues(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

export const ObjectHandling = {
  removeEmptyValues,
};
