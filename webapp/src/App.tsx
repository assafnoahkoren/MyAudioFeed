import { useLoginMutation } from "./queries/auth/login";
import { useLogOutMutation } from "./queries/auth/logout";
import { useCheckSessionQuery } from "./queries/auth/session";
import { useCreateJobMutation } from "./queries/jobs/create";
import { useMyJobsQuery } from "./queries/jobs/get";

function App() {
  const loginMutation = useLoginMutation();
  const logOutMutation = useLogOutMutation();
  const createJobMutation = useCreateJobMutation();
  const checkSessionQuery = useCheckSessionQuery();
  const myJobsQuery = useMyJobsQuery();


  return (
    <>
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
      <button onClick={() => {
          createJobMutation.mutate({
          args: null,
          created_at: new Date().toISOString(),
          modified_at: null,
          owner_id: checkSessionQuery.data?.data.user?.id,
          stage: "initial",
          status: "pending",
          type: "full-time"
        })
      }}>Create Job</button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {myJobsQuery.data?.data?.map((job) => {
          return (
            <div key={job.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", margin: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <p><strong>ID:</strong> {job.id}</p>
              <p><strong>Stage:</strong> {job.stage}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Type:</strong> {job.type}</p>
            </div>
          );
        })}
      </div>

    </>
  )
}

export default App
