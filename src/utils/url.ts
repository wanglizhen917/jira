import { useMemo, useState } from 'react'
import {
  URLSearchParamsInit,
  useSearchParams,
} from 'react-router-dom'
import { subset } from 'utils'

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <D extends string>(
  keys: D[],
) => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in D]: string
        },
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
