import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IToken } from '../../interfaces/token';
import { verificaTokenExpirado } from '../../services/token';

// Adicionando FontAwesome para ícones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBars, faFolder, faCalendarDays, faPeopleLine, faUserGroup } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

interface IProps {
    children: ReactNode;
    token?: IToken | null;
}

export const LayoutDashboard = (props: IProps) => {
    const [token, setToken] = useState<IToken>();
    const navigate = useNavigate();

    useEffect(() => {
        const lsStorage = localStorage.getItem('casaDaPaz.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (token && !verificaTokenExpirado(token?.accessToken)) {
            setToken(token);
        } else {
            localStorage.removeItem('casaDaPaz.token');
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('casaDaPaz.token');
        navigate('/login');
    };

    return (
        <>
            {/* Cabeçalho fixo com fundo mais moderno */}
            <header className={`${styles.header} bg-dark text-white d-flex justify-content-between align-items-center`}>
                <div className="d-flex align-items-center">
                    {/* Ícone do menu hambúrguer visível apenas em telas pequenas */}
                    <button
                        className="navbar-toggler d-md-none me-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <a className={`${styles.brand} text-white`} href="/eventos">
                        Sistema Casa da Paz
                    </a>
                </div>

                <div className="navbar-nav ml-auto">
                    <div className="nav-item text-nowrap">
                        <button onClick={handleLogout} className="nav-link btn btn-link text-white px-3">
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            {/* Container geral */}
            <div className="container-fluid">
                <div className="row">
                    {/* Barra lateral com ícones e colapsável */}
                    <nav
                        id="sidebarMenu"
                        className={`${styles.sidebar} col-md-3 col-lg-2 d-md-block bg-light sidebar collapse`}
                    >
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/eventos'}>
                                        <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                                        Eventos
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to={'/usuarios'}>
                                        <FontAwesomeIcon icon={faUserGroup} className="me-2" />
                                        Usuários
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to={'/voluntarios'}>
                                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                                        Voluntários
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to={'/galerias'}>
                                        <FontAwesomeIcon icon={faFolder} className="me-2" />
                                        Galeria
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Área principal */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
};
