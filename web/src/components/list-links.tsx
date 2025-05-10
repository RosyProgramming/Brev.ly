import { Link } from "@phosphor-icons/react";
import { ItemLinks } from "./item-links";
import { useLinks} from "../store/links";

export function ListLink() {
    const links = useLinks(store => store.links)
    const isLinkListEmpty = links.size === 0

    return (
        <div className="flex flex-col w-full max-w-full gap-2 items-center md:max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-base scrollbar-hover:scrollbar-thumb-blue-dark">
            {isLinkListEmpty ? (
                <>
                    <hr className="w-full border-t border-gray-200" />
                    <div className=" w-full flex flex-col justify-center items-center pt-4 pb-6 px-0 gap-3 flex-none order-1 self-stretch flex-grow-0">
                        <Link size={32} className="text-gray-400" />
                        <span className="font-normal text-[10px] leading-[14px] text-gray-500 uppercase">
                            ainda não existem links cadastrados
                        </span>
                    </div>
                </>
            ) : (
                <>
                    { Array.from(links.entries()).map(([linkId, link]) => {
                        return <ItemLinks key={linkId} item={link} />
                    })}
                    
                </>
            )}
        </div>
    )
}