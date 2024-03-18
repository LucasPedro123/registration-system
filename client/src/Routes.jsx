import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Component/SignUp/Signup'
import Signin from './Component/SignIn/Signin'
import Home from './Component/Home/Home-component'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/login' element={<Signin />} />
                <Route path='/home' element={ <Home/>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default Router