import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";

interface IEvento {
    id: number;
    nome: string;
    data: string;
    complemento: string;
    logradouro: string;
}

export default function Eventos() {
    const navigate = useNavigate();
    const [selectedEventos, setSelectedEventos] = useState<number[]>([]);
    const [nameEvent, setNameEvent] = useState<String[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [dadosEventos, setDadosEventos] = useState<Array<IEvento>>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Verificação de login
    useEffect(() => {
        const lsStorage = localStorage.getItem('casaDaPaz.token');
        let token: IToken | null = null;

        if (typeof lsStorage === 'string') {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/login"); // Redireciona se não estiver logado
        }
    }, [navigate]);



    // Carregar a lista de Eventos
    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_URL + "/eventos");
                setDadosEventos(response.data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);



    // Funções de manipulação
    const handleEventClick = (eventoId: number) => {
        if (selectedEventos.includes(eventoId)) {
            setSelectedEventos(selectedEventos.filter(id => id !== eventoId)); // Remove o evento da seleção
        } else {
            setSelectedEventos([...selectedEventos, eventoId]); // Adiciona o evento à seleção
        }
    };

    const handleEditClick = () => {
        if (selectedEventos.length === 1) {
            navigate(`/eventos/${selectedEventos[0]}`);
        }
    };

    const handleDeleteClick = () => {
        if (selectedEventos.length > 0) {
            const nameEvent = dadosEventos
                .filter(evento => selectedEventos.includes(evento.id))
                .map(evento => evento.nome)
            setModalMessage(`Deseja realmente excluir o evento ${nameEvent}?`);
            setShowModal(true);
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedEventos.length > 0) {
            const deletePromises = selectedEventos.map(id =>
                axios.delete(import.meta.env.VITE_URL + `/eventos/${id}`)
            );

            Promise.all(deletePromises)
                .then(() => {
                    setDadosEventos(prev => prev.filter(evento => !selectedEventos.includes(evento.id)));
                    setSelectedEventos([]); // Limpa a seleção
                    setShowModal(false);
                })
                .catch(err => console.error("Erro ao deletar os eventos:", err));
        }
    };

    // Renderização
    if (loading) {
        return <Loading />; // Use seu componente de Loading aqui
    }

    return (
        <LayoutDashboard>
            {/* Cabeçalho da página com título e botões de ação */}
            <div className="d-flex flex-column flex-md-row justify-content-between mt-3 align-items-center">
                <h1 className="h2">Eventos</h1>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                    <button type="button" className="btn btn-light me-2" onClick={() => navigate("/eventos/criar")}>
                        <FaPlus className="text-success" />
                    </button>
                    <button type="button" className="btn btn-light me-2" onClick={handleEditClick} disabled={selectedEventos.length !== 1}>
                        <FaEdit className={selectedEventos.length === 1 ? "text-warning" : "text-muted"} />
                    </button>
                    <button type="button" className="btn btn-light me-2" onClick={handleDeleteClick} disabled={selectedEventos.length === 0}>
                        <FaTrash className={selectedEventos.length > 0 ? "text-danger" : "text-muted"} />
                    </button>
                </div>
            </div>

            {/* Barra de pesquisa */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar evento"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                    <FaSearch />
                </button>
            </div>

            {/* Tabela de eventos */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Data</th>
                            <th scope="col">Logradouro</th>
                            <th scope="col">Complemento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosEventos.filter(evento =>
                            evento.nome.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map(evento => (
                            <tr
                                key={evento.id}
                                onClick={() => handleEventClick(evento.id)}

                            >
                                <td>{evento.nome}</td>
                                <td>{evento.data}</td>
                                <td>{evento.logradouro}</td>
                                <td>{evento.complemento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de confirmação de exclusão */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
}
