import './Grid.css';

const Grid = (props) => {
    var className = `Grid ${props.className}`;
    return (
        <div className={className} style={{width:props.width}}>
            {props.children}
        </div>
    )
}

export default Grid;
