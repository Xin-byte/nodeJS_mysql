// from uuid to bin format

export const uuidToBin = id => {
  const newId = id.replace(/-/g, '')

  return Buffer.from(newId, 'hex')
}
