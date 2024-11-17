import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        if (refForm.current.checkValidity()) {
            setLoading(true);
            const target = event.target as typeof event.target & {
                email: { value: string };
                password: { value: string };
            };

            axios.post(import.meta.env.VITE_URL + "/login", {
                email: target.email.value,
                password: target.password.value,
            }).then((resposta) => {
                localStorage.setItem('casaDaPaz.token', JSON.stringify(resposta.data));
                navigate('/eventos');
            }).catch((erro) => {
                setLoading(false);
                const errorMessage = erro.response?.data?.message || 'Erro ao realizar login';
                setToast({ message: errorMessage, type: 'danger' });
            });

        } else {
            refForm.current.classList.add('was-validated');
        }
    }, [navigate]);

    return (
        <>
            <Loading visible={loading} />
            {toast && (
                <Toast
                    show={!!toast}
                    message={toast.message}
                    colors={toast.type}
                    onClose={() => setToast(null)}
                    aria-live="assertive"
                />
            )}
            <div className={styles['background-gradient']}>
                <div className={styles.border}>
                    <div className='d-flex flex-column align-items-center'>
                        <h1 className={styles.textPrimary}>Login</h1>
                        <p className='text-secondary'>Preencha os campos para logar</p>
                    </div>
                    <hr />
                    <form
                        className='needs-validation'
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite seu email'
                                id='email'
                                required
                            />
                            <div className='invalid-feedback'>Por favor digite seu email</div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Senha</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Digite sua senha'
                                id='password'
                                required
                            />
                            <div className='invalid-feedback'>Por favor digite sua senha</div>
                        </div>
                        <button className='btn btn-primary w-100' type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
        </>
    );
}
