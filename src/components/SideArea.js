import { Link } from 'react-router-dom';
import '../styles/SideArea.css';
import cross from '../static/cross.png'
import pdficon from '../static/pdf.png';

function SideArea(props){
    const pdfs = props.content;
    return (
        <div className="sideArea">
          <img id='cross' src={cross} alt='close' onClick={props.onClick}/>
            <h2>{props.contentHeading}</h2>
      <ul>
        {pdfs.map(pdf => (
          <li key={pdf.id}><img id='pdficon' src={pdficon} alt='pdficon'/><Link id='notespdf' to={pdf.url}>{pdf.name}</Link></li>
        ))}
      </ul>
        </div>
    )
}
export default SideArea;