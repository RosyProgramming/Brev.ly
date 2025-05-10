import { DownloadSimple } from '@phosphor-icons/react';
import { Button } from "./ui/button";
import { Header } from "./ui/header";
import { useState } from 'react';
import { useLinks } from '../store/links';
import { api } from "../http/api-fetch";
import { toast } from 'react-toastify';
import { ListLink } from './list-links';

export function MyLink() {
    const [isLoading, setIsLoading] = useState(false);
    const { links } = useLinks();
    const hasData = links.size > 0;

    async function exportToCSVAndlinks() {

        setIsLoading(true)

        try{

            const response = await api.get('/link/report');

            if(response.status === 200){
                const link = document.createElement('a');
                link.href = response.data.reportUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast("CSV exportado com sucesso!", { type: "success" });
            } else {
                toast("Erro ao gerar o CSV", { type: "error" });
            }

        }catch(error){
            toast("Erro ao exportar CSV", { type: "error" });
        }

        setIsLoading(false);
    }


    return (
        <div className=" flex flex-col gap-5 p-8  w-full md:max-w-[580px] bg-gray-100 rounded-lg top-36">
            <div className="flex flex-row  justify-between gap-2 p-0 top-32 flex-none order self-stretch flex-grow-0">
                <Header title="Meus Links" />
                <Button 
                    variant="secondary"
                    size="medium"
                    label="Baixar CSV"
                    icon={<DownloadSimple size={16} className="text-gray-600" />}
                    disabled={!hasData || isLoading}
                    onClick={exportToCSVAndlinks}
                /> 
            </div>
            <ListLink />
        </div>
      );
}