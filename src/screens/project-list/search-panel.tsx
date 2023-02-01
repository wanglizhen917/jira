import { Form, Input, Select } from 'antd'
import { UserSelect } from 'components/user-select'
import React from 'react'
import { Project } from './list'

export interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

export const SearchPanel = ({
  users,
  param,
  setParam,
}: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          placeholder=""
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({ ...param, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value) =>
            setParam({ ...param, personId: value })
          }
          defaultOptionName="负责人"
        />
      </Form.Item>
    </Form>
  )
}
