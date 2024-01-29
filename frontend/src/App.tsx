import React from 'react';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
    getAllUsers {
      name
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);

  // if (loading) {
  //   return <h1>loading...</h1>;
  // }

  return (
    <>
      <table>
        <tbody>
          {data?.getTodos.map((todo: any) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.getAllUsers.map((ele: any) => {
        return (
          <tbody>
            <tr>{ele.name}</tr>
          </tbody>
        );
      })}
    </>
  );
}
export default App;
