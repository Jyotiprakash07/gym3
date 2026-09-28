export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-mark">FORGE</div>
      <div className="navbar-links">
        <a href="#programs">Programs</a>
        <a href="#trainers">Trainers</a>
        <a href="#membership">Membership</a>
        <a href="#contact">Contact</a>
      </div>
      <a href="#membership" className="navbar-cta">
        Join now
      </a>
    </nav>
  )
}
