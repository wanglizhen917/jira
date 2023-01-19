export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsey(value)) {
      delete result[key]
    }
  })
  return result
}

export const isFalsey = (value) => (value === 0 ? false : !value)
