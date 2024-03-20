import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ForgotPassword from './Component/ForgotPass/ForgotPass-component'
import ResetPassword from './Component/ResetPassword/ResetPassword-component'
import Home from './Pages/Home/Home'
import Main from './Component/Home/Home-component'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={ <Main/>} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/resetpassword/:token' element={<ResetPassword/> } />

                
            </Routes>
        </BrowserRouter>
    )
}

export default Router