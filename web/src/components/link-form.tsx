import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { api } from '../http/api-fetch'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Header } from './ui/header'
import { useLinks } from '../store/links'
import axios from 'axios'

// Schema com validações
const formSchema = z.object({
  originalUrl: z.string().min(1, 'Informe uma url válida.').url('URL inválida'),
  shortUrl: z
    .string()
    .min(1, 'Informe uma url minúscula e sem espaço/caracter especial.'),
})

type FormData = z.infer<typeof formSchema>

export function LinkForm() {
  const { addLink } = useLinks()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    const finalOriginalUrl = data.originalUrl.startsWith('https://')
      ? data.originalUrl
      : `https://${data.originalUrl}`

    try {
      const response = await api.post('/link', {
        originalUrl: finalOriginalUrl,
        shortUrl: data.shortUrl,
      })

      if (response.status === 201) {
        const savedUrl = await api.get(`/link/${response.data.link.shortUrl}`)

        if (savedUrl.data) {
          addLink({
            id: response.data.link.id,
            ...response.data.link,
          })
        }

        toast('URL salva com sucesso', { type: 'success' })
        reset()
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message

        if (errorMessage === 'Short URL already exists') {
          toast('Esse link personalizado já existe. Tente outro nome.', {
            type: 'warning',
          })
        } else if (errorMessage === 'URL inválida') {
          toast('URL inválida', { type: 'warning' })
        } else {
          toast(errorMessage || 'Erro ao salvar URL', { type: 'error' })
        }
      } else {
        toast('Erro desconhecido ao salvar URL', { type: 'error' })
      }
    }
  }

  return (
    <div className="flex flex-col flex-start p-6 md:p-8 gap-6 top-32 bg-gray-100 rounded-lg">
      <Header title="Novo link" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4"
      >
        <Input
          label="link original"
          type="url"
          placeholder="https://exemplo.com"
          {...register('originalUrl')}
          error={errors.originalUrl?.message}
        />
        <Input
          label="link encurtado"
          type="text"
          prefix="brev.ly/" 
          {...register('shortUrl')}
          error={errors.shortUrl?.message}
        />
        <Button
          type="submit"
          variant="primary"
          size="large"
          label="Salvar link"
          disabled={isSubmitting}
        />
      </form>
    </div>
  )
}
