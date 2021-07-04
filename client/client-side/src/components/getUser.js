import React,{useEffect} from "react";
import  {useQuery,gql} from '@apollo/client'
import {LOAD_USERS} from '../GraphQL/Query' 

function GetUsers() {
    const {error, loading, data}=useQuery(LOAD_USERS)

    useEffect(()=>{
        console.log(data)
    },[data])

    return (
      <div>HII</div>
    );
  }
  
  export default GetUsers;
  