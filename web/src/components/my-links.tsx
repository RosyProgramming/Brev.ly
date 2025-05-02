import { DownloadSimple } from '@phosphor-icons/react';
import { Button } from "./button";
import { Header } from "./header";
import { useState } from 'react';
import { useUrls } from '../store/urls';
import { api } from "../shared/api-fetch";
import { toast } from 'react-toastify';

export function MyLink() {
    const [isLoading, setIsLoading] = useState(false);
    const { urls } = useUrls();
    const hasData = urls.size > 0;

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
        <div className=" flex flex-col gap-5 max-w-[366px] md:max-w-[580px] w-full ">
            <div className="flex flex-row p-8 md:p-6 gap-4 top-32 bg-gray-100 rounded-lg">
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

        </div>
      );
}