import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({isAdmin,component:Component,...rest}) => {
    const {loading,isAuthenticated,user} = useSelector((state)=>state.user)
    const navigate = useNavigate(); 
    


    if (loading === false) {
        if(!isAuthenticated){
            return navigate("/login")
        }

        if(isAdmin === true && user.role !== "admin"){
            return navigate("/login")
        }
        
        return <Component />
        
    }

//   return (
//     <Fragment>
//         {!loading && (
            
//             <Route
//             {...rest}
//             render = {(props)=>{

//                 if(!isAuthenticated){
//                     return navigate("/login")
//                 }

//                 return <Component {...props} />
//             }}
//             />
//         )}
//     </Fragment>
//   )
}

export default ProtectedRoute