import React, { Suspense } from 'react'
import { RotatingLines, Triangle } from 'react-loader-spinner'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const Login = React.lazy(()=>import("./components/screen/login/login"))
const PrivateRoute = React.lazy(()=>import("./components/Admin/privateRoute/privateRoute"))
const PrivateSnd = React.lazy(()=>import("./components/Admin/privateRoute/Privatetwo"))
const Error = React.lazy(()=>import("./components/screen/error/error"))
const Partner = React.lazy(()=>import("./components/Admin/partnerCreation/partnerMain"))
const MerchantCreation = React.lazy(()=>import("./components/Admin/merchant/MerchantMain"))
const Merchant = React.lazy(()=>import("./components/Merchant/merchant"))


const App = () => {

  return (
    <BrowserRouter>
     <Suspense fallback={<div style={{
          width:"100%",
          height:"95vh",
          textAlign:'center',
          alignItems:"center",
          display:'flex',
          justifyContent:'center',
        }}> 
        <Triangle
         height="80"
         width="80"
         color="#0d6efd"
         ariaLabel="triangle-loading"
         wrapperStyle={{}}
         wrapperClassName=""
         visible={true}
       />
      </div>}>
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="*" element={<Error/>}/>
       <Route path="/admin" element={<PrivateRoute><Partner/></PrivateRoute>}/>
       <Route path="/merchant" element={<PrivateRoute><MerchantCreation/></PrivateRoute>}/>
        <Route path="/home" element={<PrivateSnd><Merchant/></PrivateSnd>}/>
      </Routes>
     </Suspense>     
    </BrowserRouter>
  )
}

export default App