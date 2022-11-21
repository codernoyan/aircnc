import { useEffect, useState } from "react";

const useAdmin = (user) => {

  const [isAdmin, setIsAdmin] = useState(false);
  const email = user?.email;
  
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/user/admin/${email}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsAdmin(data.isAdmin);
    })
  }, [email])
  return [isAdmin];
}
export default useAdmin;