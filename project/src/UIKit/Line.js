import './Line.css';

const Line = (props) => {
    return (
        <div className="Line" justify={props.justify} margin={props.margin} style={{width:props.width},{height:props.height}}>
            {props.children}
        </div>
    )
}

export default Line;
