import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div>
            <Link to="/cart">
                <button className="fix-button">Sepet</button>
            </Link>
        </div>
    )
}
