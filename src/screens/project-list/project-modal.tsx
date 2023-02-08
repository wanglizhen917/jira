import { Button, Drawer } from 'antd'
import React from 'react'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer
      onClose={close}
      width={'100%'}
      visible={projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
