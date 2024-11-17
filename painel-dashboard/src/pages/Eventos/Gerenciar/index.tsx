import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IToken } from "../../../interfaces/token";
import { verificaTokenExpirado } from "../../../services/token";
import { LayoutDashboard } from "../../../components/LayoutDashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import VMasker from "vanilla-masker";

interface IForm {
    nome: string;
    data: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}

type FieldNames = "nome" | "data" | "cep" | "logradouro" | "complemento" | "bairro" | "cidade" | "estado";

export default function GerenciarEventos() {
    const { register, handleSubmit, formState: { errors }, setValue, setError, trigger } = useForm<IForm>();
    const refForm = useRef<any>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        let lsStorage = localStorage.getItem("casaDaPaz.token");
        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) {
            navigate("/login");
        }

        const idEvento = Number(id);

        if (!isNaN(idEvento)) {
            setIsEdit(true);
            axios
                .get(`${import.meta.env.VITE_URL}/eventos/${idEvento}`)
                .then((res) => {
                    if (res.data) {
                        setValue("nome", res.data.nome);
                        setValue("data", res.data.data);
                        setValue("cep", res.data.cep);
                        setValue("logradouro", res.data.logradouro);
                        setValue("complemento", res.data.complemento);
                        setValue("bairro", res.data.bairro);
                        setValue("cidade", res.data.cidade);
                        setValue("estado", res.data.estado);
                        trigger();
                    } else {
                        console.error("Evento não encontrado.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar evento:", error);
                });
        }
    }, [id, navigate, setValue, trigger]);

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {
            setLoading(true);
            const request = isEdit
                ? axios.put(`${import.meta.env.VITE_URL}/eventos/${id}`, data)
                : axios.post(`${import.meta.env.VITE_URL}/eventos`, data);

            request
                .then((response) => {
                    setFeedbackMessage(isEdit ? "Evento editado com sucesso!" : "Evento criado com sucesso!");
                    setTimeout(() => {
                        navigate("/eventos");
                    }, 2000);
                })
                .catch((err) => {

                    if (err.response && err.response.status === 422) {
                        console.log("Erros de validação:", err.response.data.errors);
                        const errors = err.response.data.errors;

                        Object.keys(errors).forEach((field) => {
                            if (field in ["nome", "data", "cep", "logradouro", "complemento", "bairro", "cidade", "estado"]) {
                                setError(field as FieldNames, { type: "manual", message: errors[field][0] });
                            }
                        });

                        setFeedbackMessage("Erro de validação: Verifique os campos marcados.");
                    } else {
                        console.log("Outro erro:", err);
                        setFeedbackMessage("Erro ao salvar o evento. Tente novamente.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [isEdit, id, navigate, setError]
    );

    // Função para buscar dados do CEP na API ViaCEP
    const getCepData = async (cep: string) => {
        if (cep && cep.length == 9) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;

                if (logradouro) {
                    // Preenche automaticamente os campos com os dados retornados
                    setValue("logradouro", logradouro); // Preenchendo o campo logradouro
                    setValue("bairro", bairro); // Preenchendo o campo bairro
                    setValue("cidade", localidade); // Preenchendo o campo cidade
                    setValue("estado", uf); // Preenchendo o campo estado
                    trigger(["logradouro", "bairro", "cidade", "estado"]); // Valida os campos preenchidos
                }
            } catch (error) {
                console.error("Erro ao buscar dados do CEP:", error);
                setFeedbackMessage("Erro ao buscar dados do CEP. Tente novamente.");
            }
        }
    };

    // Função que chama a API via mudança no campo de CEP
    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const maskedValue = VMasker.toPattern(value, "99999-999"); // Aplica a máscara ao CEP
        setValue("cep", maskedValue); // Atualiza o valor do campo cep no formulário
        trigger("cep"); // Garante que o CEP seja validado

        // Chama a função para buscar os dados do CEP
        getCepData(maskedValue);
    };

    return (
        <LayoutDashboard>
            <h1>{isEdit ? "Editar Evento" : "Adicionar Evento"}</h1>

            {feedbackMessage && (
                <div className={`alert ${feedbackMessage.includes("sucesso") ? "alert-success" : "alert-danger"}`} role="alert">
                    {feedbackMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(submitForm)} noValidate>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome do Evento</label>
                    <input type="text" className={`form-control ${errors.nome ? 'is-invalid' : ''}`} {...register("nome", { required: "Nome é obrigatório" })} />
                    {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="data" className="form-label">Data do Evento</label>
                    <input type="date" className={`form-control ${errors.data ? 'is-invalid' : ''}`} {...register("data", { required: "Data é obrigatória" })} />
                    {errors.data && <div className="invalid-feedback">{errors.data.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input type="text" className={`form-control ${errors.cep ? 'is-invalid' : ''}`} {...register("cep", { required: "CEP é obrigatório" })} onChange={handleCepChange} />
                    {errors.cep && <div className="invalid-feedback">{errors.cep.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="complemento" className="form-label">Complemento</label>
                    <input type="text" className="form-control" {...register("complemento")} />
                </div>

                {/* Campos responsivos para Logradouro, Bairro, Cidade e Estado */}
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="logradouro" className="form-label">Logradouro</label>
                        <input type="text" className={`form-control ${errors.logradouro ? 'is-invalid' : ''}`} {...register("logradouro", { required: "Logradouro é obrigatório" })} />
                        {errors.logradouro && <div className="invalid-feedback">{errors.logradouro.message}</div>}
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="bairro" className="form-label">Bairro</label>
                        <input type="text" className={`form-control ${errors.bairro ? 'is-invalid' : ''}`} {...register("bairro", { required: "Bairro é obrigatório" })} />
                        {errors.bairro && <div className="invalid-feedback">{errors.bairro.message}</div>}
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="cidade" className="form-label">Cidade</label>
                        <input type="text" className={`form-control ${errors.cidade ? 'is-invalid' : ''}`} {...register("cidade", { required: "Cidade é obrigatória" })} />
                        {errors.cidade && <div className="invalid-feedback">{errors.cidade.message}</div>}
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="estado" className="form-label">Estado</label>
                        <input type="text" className={`form-control ${errors.estado ? 'is-invalid' : ''}`} {...register("estado", { required: "Estado é obrigatório" })} />
                        {errors.estado && <div className="invalid-feedback">{errors.estado.message}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Carregando..." : isEdit ? "Salvar Alterações" : "Adicionar Evento"}
                </button>
            </form>
        </LayoutDashboard>
    );
}
