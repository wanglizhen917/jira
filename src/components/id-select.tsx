import { Select } from 'antd'
import React, { ComponentProps } from 'react'
import { Raw } from 'types'

// 如果props没有被暴露出来
type SelectProps = ComponentProps<typeof Select>

interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  onChange: (value: number | undefined) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

export const IdSelect = (props: IdSelectProps) => {
  const {
    value,
    onChange,
    defaultOptionName,
    options,
    ...rest
  } = props
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) =>
        onChange(toNumber(value) || undefined)
      }
      {...rest}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>
          {defaultOptionName}
        </Select.Option>
      ) : null}
      {options?.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) =>
  isNaN(Number(value)) ? 0 : Number(value)
