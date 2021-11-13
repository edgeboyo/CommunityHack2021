export function checkFileds(required: string[], object: object) {
  const checked = required
    .map((field) => {
      return [field, field in object];
    })
    .filter(([field, value]) => !value);

  return Object.keys(Object.fromEntries(checked));
}
