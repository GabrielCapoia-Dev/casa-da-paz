import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IToken } from "../../../interfaces/token";
import { verificaTokenExpirado } from "../../../services/token";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IForm {
    eventoId?: number | null; // ID do evento associado (opcional)
    imagens?: FileList; // Arquivos de imagens (opcional)
}

type FieldNames = "eventoId" | "imagens";

export default function GerenciarGalerias() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        trigger,
    } = useForm<IForm>();

    const refForm = useRef<any>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [eventos, setEventos] = useState<Array<{ id: number; nome: string }>>([]); // Lista de eventos
    const [imagensPreview, setImagensPreview] = useState<string[]>([]); // Estado para armazenar os previews das imagens

    // Carregar os eventos disponíveis
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_URL}/eventos`)
            .then((res) => {
                setEventos(res.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar eventos:", error);
            });
    }, []);

    // Verificar token de login
    useEffect(() => {
        const lsStorage = localStorage.getItem("casaDaPaz.token");
        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) {
            navigate("/login");
        }

        const idGaleria = Number(id);

        if (!isNaN(idGaleria)) {
            setIsEdit(true);
            axios
                .get(`${import.meta.env.VITE_URL}/galeria/${idGaleria}`)
                .then((res) => {
                    if (res.data) {
                        setValue("eventoId", res.data.eventoId);
                        trigger("eventoId");
                    } else {
                        console.error("Galeria não encontrada.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar galeria:", error);
                });
        }
    }, [id, navigate, setValue, trigger]);

    // Função para exibir a pré-visualização das imagens selecionadas
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // Limpar previews anteriores
            setImagensPreview([]);

            // Criar os previews das imagens
            const fileArray = Array.from(files);
            const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
            setImagensPreview(previewUrls);
        }
    };

    const submitForm: SubmitHandler<IForm> = useCallback(
        async (data) => {
            console.log(`Id do evento: ${data.eventoId}`)
            setLoading(true);
            const images = data.imagens;
            const formData = new FormData();
            
            // Enviar as imagens uma por uma
            if (images && images.length > 0) {
                
                const imagePromises = Array.from(images).map((file) => {

                    const imageFormData = new FormData();


                    imageFormData.append("name", file); // Adiciona uma imagem de cada vez
                    imageFormData.append("evento_id", String(data.eventoId)); // Adiciona eventoId ao formulário
                    
                    // Envia uma requisição para cada imagem
                    return axios.post(`${import.meta.env.VITE_URL}/galeria/${isEdit ? id : ""}`, imageFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Define o cabeçalho para upload de arquivos
                        },
                    });
                });

                try {
                    // Aguarda a conclusão de todas as requisições
                    await Promise.all(imagePromises);
                    setFeedbackMessage(isEdit ? "Galeria editada com sucesso!" : "Galeria criada com sucesso!");
                    setToast(true);
                    setTimeout(() => {
                        navigate("/galerias");
                    }, 2000);
                } catch (error) {
                    console.log("Erro ao salvar imagens:", error);
                    setFeedbackMessage("Erro ao salvar as imagens. Tente novamente.");
                    setToast(true);
                }
            } else {
                setFeedbackMessage("Nenhuma imagem foi selecionada.");
                setToast(true);
            }

            setLoading(false);
        },
        [isEdit, id, navigate, setError]
    );


    return (
        <LayoutDashboard>
            <h1>{isEdit ? "Editar Galeria" : "Adicionar Galeria"}</h1>

            {feedbackMessage && (
                <div className={`alert ${feedbackMessage.includes("sucesso") ? "alert-success" : "alert-danger"}`} role="alert">
                    {feedbackMessage}
                </div>
            )}

            <form
                className="row g-3 needs-validation mb-3"
                noValidate
                onSubmit={handleSubmit(submitForm)}
                ref={refForm}
            >
                <div className="col-md-12">
                    <label htmlFor="eventoId" className="form-label">Evento</label>
                    <select
                        className={`form-control ${errors.eventoId ? 'is-invalid' : ''}`}
                        id="eventoId"
                        {...register("eventoId")}
                    >
                        <option value="">Selecione um evento</option>
                        {eventos.map((evento) => (
                            <option key={evento.id} value={evento.id}>
                                {evento.nome}
                            </option>
                        ))}
                    </select>
                    <div className="invalid-feedback">
                        {errors.eventoId && errors.eventoId.message}
                    </div>
                </div>

                <div className="col-md-12">
                    <label htmlFor="imagens" className="form-label">Imagens</label>
                    <input
                        type="file"
                        className={`form-control ${errors.imagens ? 'is-invalid' : ''}`}
                        id="imagens"
                        multiple
                        {...register("imagens")}
                        onChange={handleImageChange}
                    />
                    <div className="invalid-feedback">
                        {errors.imagens && errors.imagens.message}
                    </div>
                </div>

                {imagensPreview.length > 0 && (
                    <div className="col-md-12">
                        <h5>Pré-visualização das imagens:</h5>
                        <div className="d-flex flex-wrap">
                            {imagensPreview.map((url, index) => (
                                <div key={index} className="me-2 mb-2">
                                    <img src={url} alt={`preview-${index}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="col-md-12 d-flex justify-content-between">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/galerias")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </LayoutDashboard>
    );
}
