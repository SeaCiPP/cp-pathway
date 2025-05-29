import { createLazyFileRoute, Link } from '@tanstack/react-router'
import '../App.css'
// import Button from '../components/Button.jsx';

export const Route = createLazyFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>CP Pathway</h1>
      <div className="navigation-buttons">
        <Link to="/heart-score" className="nav-button">
          Start with HeartScore
        </Link>
      </div>
    </div>
  )
}
