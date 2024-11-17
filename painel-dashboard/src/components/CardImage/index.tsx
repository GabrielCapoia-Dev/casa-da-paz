import { FC } from "react";
import { IImage } from "../../interfaces/image";

interface CardImageProps {
    imagem: IImage;
    isSelected: boolean;
    onClick: () => void;
}

const CardImage: FC<CardImageProps> = ({ imagem, isSelected, onClick }) => {
    return (
        <div >
            <div className=""
                style={{
                    cursor: "pointer",
                    borderColor: isSelected ? "#ffbb00" : "transparent",
                    border: "3px solid #ddd",
                    borderRadius: "10px",
                    maxWidth: "50%",
                    maxHeight: "300px", // Limite a altura máxima
                    overflow: "hidden" // Evita que a imagem ultrapasse os limites
                }}
                onClick={onClick}
            >
                <img
                    src={imagem.url_imagem} // Usando a URL da imagem
                    alt={`Imagem do evento ${imagem.evento_id}`} // Usando o evento_id como descrição alternativa
                    className="card-img-top"
                    style={{
                        objectFit: "cover", // A imagem cobre completamente o espaço disponível
                        width: "100%", // A largura ocupa 100% do espaço do card
                        height: "", // Ajusta a altura de forma proporcional
                        borderRadius: "10px",
                    }}
                />
            </div>
        </div>
    );
}

export default CardImage;
