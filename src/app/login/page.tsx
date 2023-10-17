import { AuthButtonServer } from '@/components/AuthButtonServer'
export default function Login() {
  return (
    <section className="grid place-content-center min-h-screen">
      <h1 className="text-xl font-bolt">Inicia sesión en Twitter</h1>
      <AuthButtonServer />
    </section>
  )
}
