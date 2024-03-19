import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Component/SignUp/Signup'
import Signin from './Component/SignIn/Signin'
import Home from './Component/Home/Home-component'
import ForgotPassword from './Component/ForgotPass/ForgotPass-component'
import ResetPassword from './Component/ResetPassword/ResetPassword-component'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/login' element={<Signin />} />
                <Route path='/home' element={ <Home/>} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/resetpassword/:token' element={<ResetPassword/> } />

                
            </Routes>
        </BrowserRouter>
    )
}

export default Router