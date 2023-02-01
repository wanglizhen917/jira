import { useMemo } from 'react'
import {
  URLSearchParamsInit,
  useSearchParams,
} from 'react-router-dom'

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <D extends string>(
  keys: D[],
) => {
  const [searchParams, setSearchParam] = useSearchParams()
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in D]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams],
    ),
    (param: Partial<{ [key in D]: unknown }>) => {
      const o = {
        ...Object.fromEntries(searchParams),
        ...param,
      } as URLSearchParamsInit
      setSearchParam(o)
    },
  ] as const
}
