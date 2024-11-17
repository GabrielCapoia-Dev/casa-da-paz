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
    email: string;
    password: string;
    telefone: string;
}

type FieldNames = "nome" | "email" | "password" | "telefone";

export default function GerenciarVoluntarios() {
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

    useEffect(() => {
        const lsStorage = localStorage.getItem("casaDaPaz.token");
        let token: IToken | null = null;

        if (typeof lsStorage === "string") {
            token = JSON.parse(lsStorage);
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) {
            navigate("/login");
        }

        const idVoluntario = Number(id);

        if (!isNaN(idVoluntario)) {
            setIsEdit(true);
            axios
                .get(`${import.meta.env.VITE_URL}/voluntarios/${idVoluntario}`)
                .then((res) => {
                    if (res.data) {
                        setValue("nome", res.data.nome);
                        setValue("email", res.data.email);
                        const telefoneFormatado = VMasker.toPattern(res.data.telefone, "(99) 99999-9999");
                        setValue("telefone", telefoneFormatado);
                        trigger("telefone");
                    } else {
                        console.error("Voluntário não encontrado.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar Voluntário:", error);
                });
        }
    }, [id, navigate, setValue, trigger]);

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {
            setLoading(true);
            const request = isEdit
                ? axios.put(`${import.meta.env.VITE_URL}/voluntarios/${id}`, data)
                : axios.post(`${import.meta.env.VITE_URL}/voluntarios`, data);

            request
                .then((response) => {
                    setFeedbackMessage(isEdit ? "Voluntário editado com sucesso!" : "Voluntário criado com sucesso!");
                    setToast(true);
                    setTimeout(() => {
                        navigate("/voluntarios");
                    }, 2000);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 422) {
                        console.log("Erros de validação:", err.response.data.errors);
                        const errors = err.response.data.errors;

                        Object.keys(errors).forEach((field) => {
                            if (field in ["nome", "email", "password", "telefone"]) {
                                setError(field as FieldNames, { type: "manual", message: errors[field][0] });
                            }
                        });

                        setFeedbackMessage("Erro de validação: Verifique os campos marcados.");
                    } else {
                        console.log("Outro erro:", err);
                        setFeedbackMessage("Erro ao salvar o Voluntário. Tente novamente.");
                    }
                    setToast(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [isEdit, id, navigate, setError]
    );

    const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const maskedValue = VMasker.toPattern(value, "(99) 99999-9999");
        setValue("telefone", maskedValue);
        trigger("telefone");
    };

    return (
        <LayoutDashboard>
            <h1>{isEdit ? "Editar Voluntário" : "Adicionar Voluntário"}</h1>

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
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                        placeholder="Nome"
                        id="nome"
                        required
                        {...register("nome", { required: "Nome é obrigatório!" })}
                    />
                    <div className="invalid-feedback">
                        {errors.nome && errors.nome.message}
                    </div>
                </div>

                <div className="col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="exemplo@exemplo.com"
                        id="email"
                        required
                        {...register("email", { required: "Email é obrigatório!" })}
                    />
                    <div className="invalid-feedback">
                        {errors.email && errors.email.message}
                    </div>
                </div>

                <div className="col-md-12">
                    <label htmlFor="telefone" className="form-label">Telefone</label>
                    <input
                        type="text"
                        className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                        placeholder="(11) 98765-4321"
                        id="telefone"
                        required
                        {...register("telefone", { required: "Telefone é obrigatório!" })}
                        onChange={handleTelefoneChange}
                    />
                    <div className="invalid-feedback">
                        {errors.telefone && errors.telefone.message}
                    </div>
                </div>

                <div className="col-md-12 d-flex justify-content-between">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/voluntarios")}>
                        Voltar
                    </button>
                </div>
            </form>
        </LayoutDashboard>
    );
}
