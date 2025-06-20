import { Link } from "react-router-dom"

export default function Header() {
  return (
    <nav>
      <Link to="/">Início</Link> | <Link to="/create">Novo Portfólio</Link>
    </nav>
  )
}
