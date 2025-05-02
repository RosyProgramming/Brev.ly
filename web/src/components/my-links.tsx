import { DownloadSimple } from '@phosphor-icons/react';
import { Button } from "./button";
import { Header } from "./header";
import { useState } from 'react';
import { useUrls } from '../store/urls';

export function MyLink() {
    const [isLoading, setIsLoading] = useState(false);
    const { urls } = useUrls();
    const hasData = urls.size > 0;


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
                    
                /> 
            </div>

        </div>
      );
}