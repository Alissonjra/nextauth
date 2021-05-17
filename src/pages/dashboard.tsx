import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Can } from "../components/Can"
import { setupAPIClient } from "../services/api"
import { api } from "../services/apiClient"
import { withSSRAuth } from "../utils/withSSRAuth"

export  default function Dashboard(){
  const {user,isAuthenticated,signOut} = useContext(AuthContext)



  useEffect(()=> {
    api.get('/me').then(response => console.log(response))
  },[])

  return (
    <div>
      <h1>Dashboard {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>
       
       <Can permissions={['metrics.list']}>
         <h2>Métricas</h2>
       </Can>
       
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async(ctx)=>{
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props:{}
  }
})