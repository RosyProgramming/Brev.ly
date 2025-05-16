import { Link } from 'react-router-dom';
import notFound from "../assets/404.svg";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col items-center justify-center max-h-[329px] max-w-[580px] bg-gray-100 px-12 py-16 gap-6 rounded-lg'>
        <img src={notFound} alt="404" className="w-[194px] h-[85px]" />
        <h1 className="text-2xl text-center font-bold flex-none self-stretch text-gray-600">
          Link não encontrado
        </h1>
        <p className="text-sm text-center font-semibold flex-none self-stretch flex-grow-0 text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em&nbsp;
          <Link to="/" className="text-blue-base hover:underline">
            Brev.ly
          </Link>.
        </p>
      </div>
    </div>
  );
}