import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../http/api-fetch';
import logoIcon from '../assets/Logo_Icon.svg';
import { NotFound } from './notFound';
import type { AxiosError } from 'axios';

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}


export function Redirect() {
  const { shortUrl } = useParams();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function handleRedirect() {
      try {
        const response = await api.get(`/link/${shortUrl}`);
        console.log(response)
        const { originalUrl } = response.data;

        if (originalUrl && isValidUrl(originalUrl)) {
          setOriginalUrl(originalUrl);
          setTimeout(() => {
            window.location.href = originalUrl;
          }, 3000);
        } else {
          setNotFound(true);
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 404) {
          setNotFound(true);
        } else {
          console.error("Erro ao buscar URL:", axiosError);
          setNotFound(true);
        }
      }
    }

    handleRedirect();
  }, [shortUrl]);

  if (notFound) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center max-h-[296px] max-w-[580px] bg-gray-100 px-12 py-16 gap-6">
        <img src={logoIcon} alt="Logo Brev.lyv" className="w-12 h-12" />
        <h1 className="text-xl text-gray-600">Redirecionando...</h1>
        <p className="text-md text-gray-500 text-center">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?&nbsp;
          <a href={originalUrl ?? undefined} className="text-blue-500 hover:underline">
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  );
}
