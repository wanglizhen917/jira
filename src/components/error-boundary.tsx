import React, {
  Component,
  PropsWithChildren,
  ReactNode,
} from 'react'

type FallbackRender = (props: {
  error: Error | null
}) => React.ReactElement

//https://github.com/bvaughn/react-error-boundary 处理错误边界的react库
export class ErrorBoundary extends Component<
  //{ children: ReactNode; fallbackRender: FallbackRender },
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }

  //当子组件抛出异常，这里会接受到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender(error)
    }
    return children
  }
}
