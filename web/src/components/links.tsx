import { Copy, Trash } from "@phosphor-icons/react";
import { Button } from "./ui/button";

export function Links() {
    return (
        <div className="flex flex-row justify-between items-center py-[2px] gap-5 w-full border-t border-gray-200">
            <div className="cursor-pointer flex flex-col gap-1 flex-none order-0 flex-grow">
                <span className="font-semibold text-sm leading-[18px] text-blue-base flex-none order-0 self-stretch grow-0 truncate">shortUrl</span>
                <span className="font-normal text-xs text-gray-200 leading-4 flex-none order-1 self-stretch grow-0 truncate">originalUrl</span>
            </div>
            <span className="w-[61px] h-4 text-[12px] leading-4 font-normal text-right text-gray-500 order-1 flex-none grow-0">
                30 acessos
            </span>
            <div className="flex flex-row items-center p-0 gap-1 flex-none order-2 flex-grow-0">
                <Button
                    variant="secondary"
                    size="small"
                    icon={<Copy size={16} className="text-gray-600" />}
                    onClick={}
                />
                <Button
                    variant="secondary"
                    size="small"
                    icon={<Trash size={16} className="text-gray-600" />}
                    onClick={removeLink} label={""} 
                />
            </div>
        </div>
    )
}