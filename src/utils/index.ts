export const cleanObject = (object: any) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsey(value)) {
      delete result[key]
    }
  })
  return result
}

export const isFalsey = (value: any) =>
  value === 0 ? false : !value
