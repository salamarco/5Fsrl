import React from 'react';
import Header from '../../Components/Header/Header.tsx';
import './Help.css';
import { Footer } from '../../Components/Footer/Footer';

const Help: React.FC = () => {
    return (
        <div className="help-page">
            <div className='header-section'>
                <Header animation={false}/>
            </div>
            <div className="help-content">
                <h1 className="help-title">Centro Assistenza 5Fsrl</h1>
                <section className="help-section">
                    <h2>Cos'è 5Fsrl?</h2>
                    <p>
                        5Fsrl è una web application progettata per aiutarti a gestire in modo semplice e intuitivo le tue attività scolastiche e personali. Grazie a un'interfaccia moderna e interattiva, puoi organizzare eventi, visualizzare statistiche e ottimizzare il tuo tempo.
                    </p>
                </section>
                <section className="help-section">
                    <h2>Come si usa l'applicazione?</h2>
                    <ol>
                        <li>
                            <strong>Utilizza l'app:</strong> Clicca il pulsante <i>Start Now</i> e crea un account o accedi per utilizzare la tua dashboard personale.
                        </li>
                        <li>
                            <strong>Esplora l'homepage:</strong> Troverai diversi box interattivi che rappresentano le principali funzionalità (Statistiche, Calendario, Scuola, Personale).
                        </li>
                        <li>
                            <strong>Gestisci le tue attività:</strong> Utilizza le sezioni dedicate per aggiungere, modificare o visualizzare eventi e statistiche.
                        </li>
                        <li>
                            <strong>Personalizza la tua esperienza:</strong> L'applicazione si adatta alle tue esigenze, sia su desktop che su dispositivi mobili.
                        </li>
                    </ol>
                </section>
                <section className="help-section">
                    <h2>Domande Frequenti</h2>
                    <div className="faq">
                        <div className="faq-item">
                            <h3>Come posso aggiungere un nuovo evento?</h3>
                            <p>
                                Vai nella sezione "Calendario" e clicca sul pulsante "Aggiungi evento". Compila i campi richiesti e salva.
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>Posso modificare o eliminare un'attività?</h3>
                            <p>
                                Sì, ogni attività può essere modificata o eliminata cliccando sull'icona corrispondente accanto all'evento.
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>L'applicazione funziona anche su smartphone?</h3>
                            <p>
                                Purtroppo 5Fsrl è progettata per essere completamente responsiva solo sul web, tuttavia al più presto sarà utilizzabile su qualsiasi dispositivo.
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>Come posso visualizzare le statistiche delle mie attività?</h3>
                            <p>
                                Essendo un'applicazione appena realizzata non sono ancora disponibili delle statistiche. Il nostro team sta lavorando ad un aggiornamento dell'applicazione per consultare grafici e dati aggiornati sulle tue attività.
                            </p>
                        </div>
                        <div className="faq-item">
                            <h3>Chi posso contattare per assistenza?</h3>
                            <p>
                                Compila il form qui sotto oppure scrivi a <a className='mail-5f' href="mailto:5Fsrl@isarchimede.it">5Fsrl@isarchimede.it</a>.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="help-section">
                    <h2>Contattaci</h2>
                    <form className="contact-form" action="mailto:5Fsrl@isarchimede.it" method="POST" encType="text/plain">
                        <label>
                            Nome:
                            <input type="text" name="nome" required />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" required />
                        </label>
                        <label>
                            Messaggio:
                            <textarea name="messaggio" rows={5} required />
                        </label>
                        <button type="submit">Invia</button>
                    </form>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Help;