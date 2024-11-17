import { useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
    permissoes: string;
}

export default function Usuarios() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [nameUsers, setNameUsers] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [dadosUsuarios, setDadosUsuarios] = useState<Array<IUsuarios>>([]);
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
            navigate("/login");
        }
    }, [navigate]);

    // Carregar a lista de usuários
    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_URL + "/usuarios");
                setDadosUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    // Funções de manipulação
    const handleUserClick = (usuarioId: number) => {
        if (selectedUsers.includes(usuarioId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== usuarioId)); // Remove o usuário da seleção
        } else {
            setSelectedUsers([...selectedUsers, usuarioId]); // Adiciona o usuário à seleção
        }
    };

    const handleEditClick = () => {
        if (selectedUsers.length === 1) {
            navigate(`/usuarios/${selectedUsers[0]}`);
        }
    };

    const handleDeleteClick = () => {
        if (selectedUsers.length > 0) {
            const nameUsers = dadosUsuarios
                .filter(usuario => selectedUsers.includes(usuario.id))
                .map(usuario => usuario.nome)
            setModalMessage(`Deseja realmente excluir o usuario ${nameUsers}?`);
            setShowModal(true);
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedUsers.length > 0) {
            const deletePromises = selectedUsers.map(id =>
                axios.delete(import.meta.env.VITE_URL + `/deletar/${id}`)
            );

            Promise.all(deletePromises)
                .then(() => {
                    setDadosUsuarios(prev => prev.filter(usuario => !selectedUsers.includes(usuario.id)));
                    setSelectedUsers([]);
                    setShowModal(false);
                })
                .catch(err => console.error("Erro ao deletar os usuários:", err));
        }
    };

    // Renderização
    if (loading) {
        return <Loading />;
    }

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1 className="h2">Usuários</h1>
                <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-light me-2" onClick={() => navigate("/usuarios/criar")}>
                        <FaUserPlus className="text-success" />
                    </button>
                    <button type="button" className="btn btn-light me-2" onClick={handleEditClick} disabled={selectedUsers.length !== 1}>
                        <FaEdit className={selectedUsers.length === 1 ? "text-warning" : "text-muted"} />
                    </button>
                    <button type="button" className="btn btn-light me-2" onClick={handleDeleteClick} disabled={selectedUsers.length === 0}>
                        <FaTrash className={selectedUsers.length > 0 ? "text-danger" : "text-muted"} />
                    </button>
                </div>
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar usuário" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button">
                    <FaSearch />
                </button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosUsuarios.filter(usuario =>
                        usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map(usuario => (
                        <tr
                            key={usuario.id}
                            onClick={() => handleUserClick(usuario.id)}
                            style={{
                                backgroundColor: selectedUsers.includes(usuario.id) ? "#d1e7dd" : "transparent", // Cor de fundo para seleção
                                cursor: "pointer",
                            }}
                        >
                            <th scope="row">{usuario.id}</th>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
