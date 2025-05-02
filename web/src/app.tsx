import { NewLink } from "./components/new-link";
import Logo from '@/assets/Logo.svg'
import { Bounce, ToastContainer } from 'react-toastify';
import { MyLink } from "./components/my-links";

export function App() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Bounce}
      />
      <div className="w-full max-w-[956px] flex flex-col items-center md:items-start">
        <img src={Logo} alt="Brev.ly logo" className="w-24 h-24 sm:self-center md:self-start" />
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 w-full">
          <NewLink />
          <MyLink />
        </div>
      </div>
    </main>
  )
}

