"use client"

import React, { useState } from 'react'
import Footer from '../Footer/page'
import Header from '../Header/page'
import { Accordion, Card, Button } from 'react-bootstrap'
import { QRCode } from 'react-qrcode-logo'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const ComoAjudar = () => {
  const [showQRCodeModal, setShowQRCodeModal] = useState(false)

  const handleGenerateQRCode = () => {
    setShowQRCodeModal(true)
  };

  const pixKey = '05509404000129'
  const nomeBeneficiario = 'Associação Assistencial e Promocional Casa da Paz'
  const cidade = 'Umuarama'
  const uf = 'PR'

  const qrCodeValue = `00020101021129370016BR.GOV.BCB.PIX0116${pixKey}5204000053039865406${nomeBeneficiario}5802${cidade}5909${uf}6007${uf}`

  return (
    <div>
      <Header />

      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <Card.Body>
                  <h2 className="text-success">Como você pode contribuir</h2>

                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Header>Voluntariado</Accordion.Header>
                      <Accordion.Body>
                        Seja um voluntário e ajude a fazer a diferença na vida de nossas crianças e adolescentes.
                        Descubra como você pode contribuir com seu tempo e habilidades.
                        <h5>Atualmente, temos necessidade de voluntários nas seguintes áreas:</h5>
                        <ul>
                          <li>Audiovisual</li>
                          <li>Marketing</li>
                          <li>Programador/Web Designer</li>
                          <li>Captador de Recursos</li>
                          <li>Oficineiro</li>
                          <li>Auxiliar de Bazar</li>
                          <li>Atividades com as Crianças</li>
                          <li>Palestrante</li>
                          <li>Promoções e Eventos</li>
                        </ul>
                        <p>Fornecemos declaração e certificado de horas complementares caso você necessite para comprovar seu voluntariado.</p>
                      </Accordion.Body>
                    </Card>
                  </Accordion>

                  <h4 className="my-4">Você pode ajudar de outras formas também!</h4>

                  <Card className="mb-4">
                    <Card.Body>
                      <h5 className="text-success">Faça uma Doação</h5>
                      <p>
                        Sua contribuição é fundamental para que a <strong>Casa da Paz</strong> continue realizando suas atividades. Através das doações, conseguimos oferecer oportunidades para crianças e adolescentes em situação de vulnerabilidade social.
                      </p>

                      <h6>Depósito ou Transferência Bancária:</h6>
                      <p>
                        Banco: SICOOB (756)<br />
                        Agência: 4379<br />
                        Conta Corrente: 4586-1<br />
                        CNPJ: 05.509.404/0001-29<br />
                        Titular: Associação Assistencial e Promocional Casa da Paz
                      </p>

                      <h6>Ou faça sua doação através do nosso PIX:</h6>
                      <p>Chave PIX: {pixKey}</p>

                      <Button variant="primary" onClick={handleGenerateQRCode}>
                        Gerar QR Code
                      </Button>
                    </Card.Body>
                  </Card>

                  <div
                    className={`modal fade ${showQRCodeModal ? 'show' : ''}`}
                    style={{ display: showQRCodeModal ? 'block' : 'none' }}
                    tabIndex={-1}
                    aria-labelledby="qrCodeModalLabel"
                    aria-hidden={!showQRCodeModal}
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="qrCodeModalLabel">QR Code para Doação via PIX</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowQRCodeModal(false)}
                            aria-label="Fechar"
                          ></button>
                        </div>
                        <div className="modal-body text-center">
                          <QRCode value={qrCodeValue} size={256} />
                          <p className="mt-3">Escaneie o QR Code para fazer a doação.</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowQRCodeModal(false)}
                          >
                            Fechar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComoAjudar;
