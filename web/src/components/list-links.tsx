import { useEffect } from 'react'
import { Link as LinkIcon } from '@phosphor-icons/react'
import { Loader } from 'lucide-react'
import { ItemLinks } from './item-links'
import { useLinks } from '../store/links'

export function ListLink() {
  const links = useLinks((store) => store.links)
  const fetchLinks = useLinks((store) => store.fetchLinks)
  const isLoading = useLinks((store) => store.isLoading)

  const isLinkListEmpty = links.size === 0

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  return (
    <div className="flex flex-col w-full max-w-full gap-2 items-center md:max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin  scrollbar-thumb-blue-base scrollbar-hover:scrollbar-thumb-blue-dark scrollbar-track-transparent">
      {isLoading ? (
        <div className="w-full flex flex-col justify-center items-center pt-4 pb-6 gap-3 animate-pulse">
          <Loader className="w-5 h-5 text-gray-500 animate-spin" />
          <span className="text-xs text-gray-500 uppercase font-medium ">
            Carregando links...
          </span>
        </div>
      ) : isLinkListEmpty ? (
        <>
          <hr className="w-full border-t border-gray-200" />
          <div className="w-full flex flex-col justify-center items-center pt-4 pb-6 px-0 gap-3">
            <LinkIcon size={32} className="text-gray-400" />
            <span className="font-normal text-[10px] leading-[14px] text-gray-500 uppercase">
              ainda não existem links cadastrados
            </span>
          </div>
        </>
      ) : (
        <div>
          {Array.from(links.entries()).map(([linkId, link]) => (
            <ItemLinks key={linkId} item={link} />
          ))}
        </div>
      )}
    </div>
  )
}
