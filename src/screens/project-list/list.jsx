export const List = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ name, personId, id }) => {
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>
                {users.find((user) => user.id === personId)
                  ?.name || 'unknown'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
