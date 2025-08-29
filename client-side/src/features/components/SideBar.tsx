import { Nav } from "react-bootstrap"
import { House } from "react-bootstrap-icons"


export default function SideBar() {
    return (

    <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light shadow"
        style={{ width: "250px", height: "100vh", position: "fixed" }}
        >
        <h4 className="mb-4">Menu</h4>
        <Nav className="flex-column">
            <Nav.Link href="#" className="d-flex align-items-center mb-2">
                <House className="me-2" size={20} /> Dashboard
            </Nav.Link>
        </Nav>
    </div>

    )
}