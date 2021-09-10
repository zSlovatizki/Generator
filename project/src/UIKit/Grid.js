import './Grid.css';

const Grid = (props) => {
    var className = `Grid ${props.className}`;
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Grid;
