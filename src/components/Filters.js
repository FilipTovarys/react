export default function Filter(props) {

    return (
        <button className="filter_button" onClick={props.onClick}>{props.text}</button>
    )
}