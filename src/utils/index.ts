export const cleanObject = (object: {
  [key: string]: unknown
}) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const isFalsey = (value: any) =>
  value === 0 ? false : !value

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''
