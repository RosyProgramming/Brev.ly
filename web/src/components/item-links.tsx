import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from './ui/button'
import { useLinks, type Link } from '../store/links'
import { toast } from 'react-toastify'

interface ItemLinksProps {
  item: Link
}

export function ItemLinks({ item }: ItemLinksProps) {
  const access = `${item.accessCount} ${item.accessCount === 1 ? 'acesso' : 'acessos'}`
  const deletelink = useLinks((state) => state.deleteLink)

  const handleUrlClick = () => {
    window.open(`/${item.shortUrl}`, '_blank')
  }

  const copyClickLink = async () => {
    const fullUrl = `${import.meta.env.VITE_FRONTEND_URL}/${item.shortUrl}`;
    await navigator.clipboard.writeText(fullUrl);
    toast('Link copiado para a área de transferência', { type: 'info' });
  }

  async function deleteClickLink() {
    try {
      deletelink(item.id)
      toast('Link deletado com sucesso', { type: 'success' })
    } catch (error) {
      toast('Erro ao deletar link', { type: 'error' })
    }
  }

  return (
    <div className="flex flex-row justify-between items-center py-[2px] gap-5 w-full border-t border-gray-200">
      <div className="flex flex-col gap-1 flex-none order-0 flex-grow w-[147px] md:w-[320px]">
        <span
          className=" cursor-pointer font-semibold text-sm leading-[18px] text-blue-base flex-none order-0 self-stretch grow-0 truncate"
          role="button"
          tabIndex={0}
          onClick={handleUrlClick}
          onKeyDown={(e) => e.key === 'Enter' && handleUrlClick()}
        >
          {import.meta.env.VITE_FRONTEND_URL.replace(/^https?:\/\//, '')}/{item.shortUrl}
        </span>
        <span className="font-normal text-xs text-gray-500 leading-4 flex-none order-1 self-stretch grow-0 truncate">
          {item.originalUrl}
        </span>
      </div>
      <span className="w-[61px] h-4 text-[12px] leading-4 font-normal text-right text-gray-500 order-1 flex-none grow-0">
        {access}
      </span>
      <div className="flex flex-row items-center p-0 gap-1 flex-none order-2 flex-grow-0">
        <Button
          variant="secondary"
          size="small"
          icon={<CopyIcon size={16} className="text-gray-600" />}
          onClick={copyClickLink}
        />
        <Button
          variant="secondary"
          size="small"
          icon={<TrashIcon size={16} className="text-gray-600" />}
          onClick={deleteClickLink}
        />
      </div>
    </div>
  )
}
