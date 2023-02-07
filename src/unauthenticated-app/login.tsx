import { AuthForm, useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input, Button } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'
import { useDispatch } from 'react-redux'

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  })

  const handleSubmit = async (values: AuthForm) => {
    try {
      await run(login(values))
    } catch (e: any) {
      onError(e)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input
          placeholder="用户名"
          type="text"
          id={'username'}
        />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input
          placeholder="密码"
          type="password"
          id={'password'}
        />
      </Form.Item>
      <Form.Item>
        <LongButton
          loading={isLoading}
          type="primary"
          htmlType="submit"
        >
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
