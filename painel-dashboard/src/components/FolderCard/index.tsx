import React, { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa"; // Ícone de pasta
import axios from "axios";

interface FolderCardProps {
    evento_Id: number;  // Recebe o evento_id como prop
    onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ evento_Id, onClick }) => {
    const [eventName, setEventName] = useState<string | null>(null); // Estado para armazenar o nome do evento
    const [loading, setLoading] = useState<boolean>(true); // Controle de loading

    // Efeito para carregar o nome do evento assim que o componente é montado
    useEffect(() => {
        const fetchEventName = async () => {
            try {
                // Faz a requisição para pegar o nome do evento usando o evento_Id
                const response = await axios.get(`${import.meta.env.VITE_URL}/eventos/${evento_Id}`);
                console.log(`Evento: ${evento_Id}`);
                setEventName(response.data.nome); // Armazenando o nome do evento
            } catch (error) {
                console.error("Erro ao buscar evento:", error);  // Tratamento de erro
                setEventName("Evento não encontrado");  // Mensagem padrão em caso de erro
            } finally {
                setLoading(false); // Para o loading após a requisição
            }
        };

        fetchEventName(); // Chama a função de busca assim que o componente for montado
    }, [evento_Id]);  // Reexecuta sempre que o evento_Id mudar

    // Se o evento está carregando, exibe um texto de loading
    if (loading) {
        return (
            <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 d-flex flex-column align-items-center"
                style={{
                    cursor: "pointer",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",  // Diminui o padding interno
                    textAlign: "center",
                    backgroundColor: "#e9e7e7",
                    minHeight: "180px",  // Aumentando a altura mínima para melhor estética
                    maxWidth: "180px",   // Define uma largura máxima
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Adiciona sombra suave
                    display: "flex",     // Garante alinhamento centralizado
                    flexDirection: "column", // Alinha o conteúdo de forma vertical
                    justifyContent: "center", // Alinha o conteúdo verticalmente
                    alignItems: "center", // Centraliza o conteúdo horizontalmente
                    overflow: "hidden",  // Evita que o conteúdo ultrapasse o limite
                }}
                onClick={onClick}
            >
                <FaFolder size={60} color="#4285F4" />
                <p className="mt-3" style={{ fontSize: "1rem", fontWeight: "500" }}>Carregando...</p>
            </div>
        );
    }

    // Se o nome do evento não estiver disponível, exibe uma mensagem padrão
    return (
        <div
            style={{
                cursor: "pointer",
                border: "1px solid #ddd",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: "#e7e7e7",
                minHeight: "150px", // Garantir que o card tenha altura mínima
                maxWidth: "180px",  // Define uma largura máxima para manter os cards uniformes
                transition: "all 0.3s ease",  // Transição suave para hover
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Sombra suave para destacar o card
                overflow: "hidden", // Evitar transbordamento de conteúdo
                padding: "15px", // Reduzir o padding para maior proporção
                display: "flex",    // Alinhamento central
                flexDirection: "column", // Organiza os elementos dentro do card de forma vertical
                justifyContent: "center", // Centraliza o conteúdo verticalmente
                alignItems: "center", // Centraliza o conteúdo horizontalmente
            }}
            onClick={onClick}
        >
            <FaFolder size={60} color="#4285F4" />
            <p className="mt-3" style={{ fontSize: "1rem", fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {eventName || "Sem Nome"} {/* Exibe o nome ou mensagem padrão */}
            </p>
        </div>
    );
};

export default FolderCard;
