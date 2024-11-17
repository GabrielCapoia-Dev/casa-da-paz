import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/Usuarios';
import GerenciarUsuarios from './pages/Usuarios/Gerenciar';
import Voluntarios from './pages/Voluntarios';
import GerenciarVoluntarios from './pages/Voluntarios/Gerenciar';
import GerenciarEventos from './pages/Eventos/Gerenciar';
import Eventos from './pages/Eventos';
import GerenciarGalerias from './pages/Galerias/Gerenciar';
import Galerias from './pages/Galerias';

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}/>
                <Route path='/galerias' element={<Galerias />}/>
                <Route path="/galerias/:id" element={<GerenciarGalerias />} />
                <Route path='/eventos' element={<Eventos />}/>
                <Route path="/eventos/:id" element={<GerenciarEventos />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuarios/:id" element={<GerenciarUsuarios />} />
                <Route path="/voluntarios" element={<Voluntarios />} />
                <Route path="/voluntarios/:id" element={<GerenciarVoluntarios />} />

            </Routes>
        </BrowserRouter>
    );
};
