import './Button.css';

export default function KitButton(props){
return(
    <button onClick={props.onClick} className="myButton">
     {props.text}
    </button>
)
}