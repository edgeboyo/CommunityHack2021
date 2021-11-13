export function checkFields(required: string[], object: object) {
  const checked = required
    .map((field) => {
      return [field, field in object];
    })
    .filter(([field, value]) => !value);

  return Object.keys(Object.fromEntries(checked));
}

export function ret(res: any, message: string | Object, code: number = 200) {
  if (message instanceof Object) {
    return res.status(code).send(JSON.stringify(message)).end();
  } else {
    return res.status(code).send(JSON.stringify({ message })).end();
  }
}
