import { useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";

interface IVoluntarios {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

export default function Voluntarios() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedVoluntarios, setSelectedVoluntarios] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [dadosVoluntarios, setDadosVoluntarios] = useState<Array<IVoluntarios>>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const lsStorage = localStorage.getItem('casaDaPaz.token');
        const token: IToken | null = lsStorage ? JSON.parse(lsStorage) : null;

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchVoluntarios = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_URL + "/voluntarios");
                setDadosVoluntarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar voluntários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVoluntarios();
    }, []);

    const handleUserClick = (voluntarioId: number) => {
        if (selectedVoluntarios.includes(voluntarioId)) {
            setSelectedVoluntarios(selectedVoluntarios.filter(id => id !== voluntarioId));
        } else {
            setSelectedVoluntarios([...selectedVoluntarios, voluntarioId]);
        }
    };

    const handleEditClick = () => {
        if (selectedVoluntarios.length === 1) {
            navigate(`/voluntarios/${selectedVoluntarios[0]}`);
        }
    };

    const handleDeleteClick = () => {
        if (selectedVoluntarios.length > 0) {
            const nameVoluntario = dadosVoluntarios
                .filter(voluntario => selectedVoluntarios.includes(voluntario.id))
                .map(voluntario => voluntario.nome)
            setModalMessage(`Deseja realmente excluir o voluntario ${nameVoluntario}?`);
            setShowModal(true);
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedVoluntarios.length > 0) {
            const deletePromises = selectedVoluntarios.map(id =>
                axios.delete(import.meta.env.VITE_URL + `/voluntarios/${id}`)
            );

            Promise.all(deletePromises)
                .then(() => {
                    setDadosVoluntarios(prev => prev.filter(voluntario => !selectedVoluntarios.includes(voluntario.id)));
                    setSelectedVoluntarios([]);
                    setShowModal(false);
                })
                .catch(err => console.error("Erro ao deletar os voluntários:", err));
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <LayoutDashboard>
            <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
                <h1 className="h2">Voluntários</h1>
                <div className="btn-group mt-2 mt-md-0" role="group">
                    <button type="button" className="btn btn-light" onClick={() => navigate("/voluntarios/criar")}>
                        <FaUserPlus className="text-success" />
                    </button>
                    <button type="button" className="btn btn-light" onClick={handleEditClick} disabled={selectedVoluntarios.length !== 1}>
                        <FaEdit className={selectedVoluntarios.length === 1 ? "text-warning" : "text-muted"} />
                    </button>
                    <button type="button" className="btn btn-light" onClick={handleDeleteClick} disabled={selectedVoluntarios.length === 0}>
                        <FaTrash className={selectedVoluntarios.length > 0 ? "text-danger" : "text-muted"} />
                    </button>
                </div>
            </div>

            <div className="input-group mb-3 mt-3">
                <input type="text" className="form-control" placeholder="Buscar voluntário" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button">
                    <FaSearch />
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosVoluntarios.filter(voluntario =>
                            voluntario.nome.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map(voluntario => (
                            <tr
                                key={voluntario.id}
                                onClick={() => handleUserClick(voluntario.id)}
                                style={{
                                    backgroundColor: selectedVoluntarios.includes(voluntario.id) ? "#d1e7dd" : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <th scope="row">{voluntario.id}</th>
                                <td>{voluntario.nome}</td>
                                <td>{voluntario.email}</td>
                                <td>{voluntario.telefone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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