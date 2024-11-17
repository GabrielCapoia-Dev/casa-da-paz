import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import axios from "axios";
import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { Modal, Button, ModalHeader } from "react-bootstrap";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import FolderCard from "../../components/FolderCard";
import { IImage } from "../../interfaces/image";
import CardImage from "../../components/CardImage";

export default function Galerias() {
    const navigate = useNavigate();
    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalImages, setModalImages] = useState<IImage[]>([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [dadosEventos, setDadosEventos] = useState<Array<{ evento_id: number | null}>>([]);
    const [dadosImagensSemEvento, setDadosImagensSemEvento] = useState<IImage[]>([]);
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


    const buscarFotos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(import.meta.env.VITE_URL + "/galeria");

            // Filtra imagens com evento e sem evento
            const imagensComEvento = response.data.filter((imagem: IImage) => imagem.evento_id !== null);
            const imagensSemEvento = response.data.filter((imagem: IImage) => imagem.evento_id === null);

            // Extrai os IDs únicos de eventos
            const eventosUnicos = Array.from(
                new Set(imagensComEvento.map((imagem: IImage) => Number(imagem.evento_id))) // Obtem apenas os IDs únicos
            ).map((evento_id) => ({
                evento_id, // Formata no objeto esperado
            }));

            console.log(eventosUnicos)

            // Atualiza os estados
            setDadosEventos(eventosUnicos);
            setDadosImagensSemEvento(imagensSemEvento);
        } catch (error) {
            console.error("Erro ao buscar imagens e eventos:", error);
        } finally {
            setLoading(false);
        }
    }, []);


    // Carregar lista de eventos e imagens ao montar o componente
    useEffect(() => {
        buscarFotos();
    }, [buscarFotos]);

    const handleDeleteConfirm = useCallback(() => {

        if (selectedImages.length > 0) {
            const deletePromises = selectedImages.map(id =>
                axios.delete(import.meta.env.VITE_URL + `/galeria/${id}`)
            );

            Promise.all(deletePromises)
                .then(() => {
                    setDadosImagensSemEvento(prev => prev.filter(imagem => !selectedImages.includes(imagem.id!)));
                    setSelectedImages([]);
                    setShowModal(false);
                })
                .catch(err => console.error("Erro ao deletar as imagens:", err));
        }

    }, [selectedImages])
    useEffect(() => {
        handleDeleteConfirm()
    }, []);


    // Funções de manipulação
    const handleImageClick = (imagemId: number) => {
        setSelectedImages((prevSelected) =>
            prevSelected.includes(imagemId)
                ? prevSelected.filter((id) => id !== imagemId)
                : [...prevSelected, imagemId]
        );
    };

    const handleDoubleClick = async (eventoId: number) => {
        console.log("Evento ID recebido:", eventoId); // Verificar se o ID está correto

        try {
            const response = await axios.get(import.meta.env.VITE_URL + "/galeria");

            const imagensFiltradas = response.data.filter((imagem: IImage) => imagem.evento_id === eventoId);
            console.log("Imagens filtradas:", imagensFiltradas); // Verificar as imagens filtradas

            setModalImages(imagensFiltradas);
            setShowImageModal(true);
        } catch (error) {
            setModalMessage(`Erro ao buscar imagens vinculadas ao evento: ${error}`);
            setShowModal(true);
            console.error("Erro ao buscar imagens vinculadas ao evento:", error);
        }
    };

    const handleDeleteClick = () => {
        if (selectedImages.length > 0) {
            setModalMessage(`Deseja realmente excluir ?`);
            console.log(`executou`)
            setShowModal(true);
        }
    };



    // Renderização
    if (loading) {
        return <Loading />;
    }

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1 className="h2">Galeria de Imagens <br /><br /></h1>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                    <button type="button" className="btn btn-light me-2" onClick={() => navigate("/galerias/criar")}>
                        <FaPlus className="text-success" />
                    </button>
                    <button type="button" className="btn btn-light me-2" onClick={handleDeleteClick} disabled={selectedImages.length === 0}>
                        <FaTrash className={selectedImages.length > 0 ? "text-danger" : "text-muted"} />
                    </button>
                </div>
            </div>


            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
                {dadosEventos
                    .filter(evento => evento.evento_id !== null)
                    .map((evento, index) => (
                        <div
                            key={index}
                            onDoubleClick={() => handleDoubleClick(evento.evento_id!)}
                        >
                            <FolderCard
                                evento_Id={evento.evento_id!}
                                onClick={() => handleImageClick(evento.evento_id!)}
                            />
                        </div>
                    ))}
            </div>


            <h3 className="mt-4">Imagens sem Evento</h3>
            <div className="row">
                {dadosImagensSemEvento.length > 0 ? (
                    dadosImagensSemEvento.map((imagem, index) => (
                        <div key={index} className="col-md-3">
                            <CardImage
                                imagem={imagem}
                                isSelected={selectedImages.includes(imagem.id!)}
                                onClick={() => handleImageClick(imagem.id!)}
                            />
                        </div>
                    ))
                ) : (
                    <p>Nenhuma imagem disponível.</p>
                )}
            </div>

            <Modal
                show={showImageModal}
                onHide={() => setShowImageModal(false)}
                size="lg" // Modal grande
                centered // Centraliza o modal na tela
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Galeria de Evento"}</Modal.Title>

                    <div className="d-flex align-items-center mt-2 mt-md-0">
                        <button type="button" className="btn btn-light me-2" onClick={() => navigate("/galerias/criar")}>
                            <FaPlus className="text-success" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={handleDeleteConfirm}
                            disabled={selectedImages.length === 0}
                        >
                            <FaTrash className={selectedImages.length > 0 ? "text-danger" : "text-muted"} />
                        </button>
                    </div>
                </Modal.Header>

                <Modal.Body
                    style={{
                        maxHeight: "80vh", // Define a altura máxima da área de conteúdo
                        overflowY: "auto", // Adiciona a barra de rolagem vertical
                        padding: "20px", // Adiciona padding
                    }}
                >
                    <div className="row g-3">
                        {modalImages.length > 0 ? (
                            modalImages.map((imagem, index) => (
                                <div
                                    key={index}
                                    className={`col-12 col-sm-6 col-md-4 ${selectedImages.includes(imagem.id!) ? "border border-primary" : ""}`}
                                    onClick={() => handleImageClick(imagem.id!)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="card">
                                        <img
                                            src={imagem.url_imagem}
                                            alt={`Imagem ${imagem.id}`}
                                            className="card-img-top"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Não há imagens para este evento.</p>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowImageModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </LayoutDashboard>
    );
}
