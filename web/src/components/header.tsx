import Logo from '@/assets/Logo.svg'

export function Header() {
  return (
    <header className="absolute top-20">
      <a href="/" className="flex items-center">
        <span className="sr-only">Brev.ly logo</span>
        <img src={Logo} alt="Brev.ly logo" className="w-24 h-6" />
      </a>
    </header>
  )
}
