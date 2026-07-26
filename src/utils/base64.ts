function decode(base64: string) {
  const buff = Buffer.from(base64, 'base64')
  return buff.toString('utf-8')
}

function encode(base64: string) {
  const buff = Buffer.from(base64, 'utf-8')
  return buff.toString('base64')
}

export default { encode, decode }
