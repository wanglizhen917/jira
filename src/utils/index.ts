import { useEffect } from 'react'

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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true,
) => {
  const oldTitle = document.title
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  })
}
