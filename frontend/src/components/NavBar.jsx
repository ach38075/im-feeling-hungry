import { Link } from "react-router-dom"
import './css/NavBar.css'

export function NavBar() {
    return (
        <div className="container">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    )
}
