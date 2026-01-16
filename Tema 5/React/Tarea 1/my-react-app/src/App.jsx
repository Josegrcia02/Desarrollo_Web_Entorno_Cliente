import { useState } from "react"
import PropTypes from "prop-types"

export default function ParentComponent() {
const [name, setName] = useState("Juanaco")
return <ChildComponent name={name} setName={setName} />
}

function ChildComponent(props) {
    return (
<>
<h1>Hello {props.name}</h1>
<button onClick={() => props.setName("Juanky")}>Change
Name</button>
<button onClick={() => props.setName("Klara")}>Change
Name</button>
</>
)
}

ChildComponent.propTypes = {
name: PropTypes.string.isRequired,
setName: PropTypes.func.isRequired,
}
