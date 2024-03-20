import Router from "./Routes";
import './assets/index.css';
import { MyProvider } from './Context/ContextState'; // Importe o provedor de contexto

function App() {
    return (
        <MyProvider>
            <Router />
        </MyProvider>
    );
}

export default App;
