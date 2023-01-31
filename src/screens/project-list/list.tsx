import { Table } from 'antd'
import React from 'react'
import { User } from './search-panel'

interface Project {
  id: string
  name: string
  personId: string
  organization: string
}

interface ListProps {
  list: Project[]
  users: User[]
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find(
                  (user: User) => user.id === project.personId,
                )?.name || 'unknown'}
              </span>
            )
          },
        },
      ]}
      dataSource={list}
    ></Table>
  )
}
