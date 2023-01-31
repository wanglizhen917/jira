import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { User } from './search-panel'

export interface Project {
  id: string
  name: string
  personId: string
  organization: string
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '部门',
          dataIndex: 'organization',
          key: 'organization',
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
          key: 'personName',
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
          key: 'created',
        },
      ]}
      {...props}
    ></Table>
  )
}
