import { useCheckSessionQuery, useLoginMutation, useLogOutMutation } from "./queries/auth/login";

function App() {
  const loginMutation = useLoginMutation();
  const logOutMutation = useLogOutMutation();
  const checkSessionQuery = useCheckSessionQuery();
  console.log(loginMutation);
  
  return (
    <>
      {checkSessionQuery.isLoading && <p>Loading...</p>}
      {checkSessionQuery.isSuccess && <p>Success</p>}
      {checkSessionQuery.isError && <p>Error: {checkSessionQuery.error}</p>}
      {JSON.stringify(checkSessionQuery.data, null, 2)}
      <h1>Hello World</h1>
      <button onClick={() => {
        loginMutation.mutate({
          email: "a@a.com",
          password: "123123"
        })
      }}>Login</button>
      <button onClick={() => {
        logOutMutation.mutate();
      }}>LogOut</button>
      {loginMutation.isPending && <p>Loading...</p>}
      {loginMutation.isSuccess && <p>Success</p>}
      {loginMutation.isError && <p>Error: {loginMutation.error}</p>}
      {JSON.stringify(loginMutation.data, null, 2)}

    </>
  )
}

export default App
