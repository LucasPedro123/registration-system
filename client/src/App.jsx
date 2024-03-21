import Router from "./Routes";
import './assets/index.css';
import { MyProvider } from './Context/ContextState'; // Importe o provedor de contexto
import {BrowserRouter} from 'react-router-dom'


function App() {
    return (
        <BrowserRouter>
            <MyProvider>
                <Router />
            </MyProvider>
        </BrowserRouter>
    );
}

export default App;
