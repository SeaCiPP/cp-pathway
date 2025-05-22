import { createLazyFileRoute } from '@tanstack/react-router'
// import Button from '../components/Button.jsx';

export const Route = createLazyFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <>
      <div>Test Landing Page</div>
    </>
  )
}
