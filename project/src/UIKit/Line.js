import './Line.css';

const Line = (props) => {
    return (
        <div className="Line" justify={props.justify} margin={props.margin}>
            {props.children}
        </div>
    )
}

export default Line;
