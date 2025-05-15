import Header from '../../Components/Header/Header';
import '.././../style.css';
import './About.css';
import {Footer} from '../../Components/Footer/Footer'
import immagine_isarchimede from '../../assets/immagine_isarchimede.png'

const about = () => {
    return (
        <div className='about-page'>
            <div className='header-section'>
                <Header animation={false}/>
            </div>

            <div className='container-about'>
                <div className='left-side'>
                    <h1 className='title'>About Us</h1>
                    <p className='text'> Siamo la classe 5F dell'<b>Istituto Archimede di Treviglio</b>, che presenta questo progetto come risultato di un impegno didattico volto all'approfondimento di
                    argomenti a livello informatico. <br></br> <br></br> Animati da un forte interesse per la materia e desiderosi di applicare in modo concreto le conoscenze acquisite, 
                    abbiamo collaborato attivamente, integrando le nostre individuali competenze e prospettive. <br></br> <br></br>
                    Questo lavoro rappresenta un'opportunità per dimostrare la nostra capacità di operare in team, 
                    di affrontare sfide complesse e di raggiungere obiettivi definiti con rigore e professionalità. 
                    Siamo lieti di condividere i risultati di questo percorso formativo.</p>
                </div>

                        <div className='right-page'>
                        <div className='archimede_image'>
                            <img src={immagine_isarchimede} alt="immagine_isarchimede.png" className='immagine_isarchimede' />
                        </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default about;