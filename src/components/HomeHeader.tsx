import { Link } from "react-router-dom"

export default function HomeHeader() {
  return (
    <div className="page-header">
      <h1>Portfólios</h1>
      <Link to="/create" className="btn-primary">
        + Novo Portfólio
      </Link>
    </div>
  )
}
