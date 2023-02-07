import { Dropdown, MenuProps, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { User } from './search-panel'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from './project-list.slice'

export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin: boolean
}

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

const useItems = () => {
  const dispatch = useDispatch()
  return [
    {
      key: '1',
      label: (
        <ButtonNoPadding
          type="link"
          onClick={() =>
            dispatch(projectListActions.openProjectModal)
          }
        >
          编辑
        </ButtonNoPadding>
      ),
    },
    {
      key: '2',
      label: <ButtonNoPadding type="link">删除</ButtonNoPadding>,
    },
  ] as MenuProps['items']
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh)

  const items = useItems() || []

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          },
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>
                {project.name}
              </Link>
            )
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
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
        },
        {
          render(value, project) {
            return (
              <Dropdown menu={{ items }}>
                <ButtonNoPadding type="link">
                  ...
                </ButtonNoPadding>
              </Dropdown>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
