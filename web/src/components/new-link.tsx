import { Header } from "./header";

export function NewLink() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-start p-8 gap-6 isolate relative w-[380px] h-[340px] left-[calc(50%-380px/2-300px)] top-36 bg-gray-50 rounded-lg">
        <h2 className="  text-gray-600 font-bold text-lg leading-6 flex items-center flex-none order-0 self-stretch flex-grow-0 z-2">Novo link</h2>
        <form className="flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2 w-full group">
          <label htmlFor="url" className="text-[10px] font-normal leading-[14px] flex items-center uppercase text-gray-500 group-focus-within:text-blue-base">
            link original
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://exemplo.com"
            className="w-[316px] h-12 flex flex-row justify-center items-center px-4 gap-2 text-gray-400  font-normal border border-gray-300 rounded-lg text-sm flex-none order-1 self-stretch flex-grow-0 focus:outline-none focus:ring-2 focus:ring-blue-base"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full group">
          <label htmlFor="shortUrl" className="text-[10px] font-normal leading-[14px] flex items-center uppercase text-gray-500 group-focus-within:text-blue-base">
            link encurtado
          </label>
          <input
            id="shortUrl"
            type="url"
            placeholder="brev.ly/"
            className="w-[316px] h-12 flex flex-row justify-center items-center px-4 gap-2 text-gray-400  font-normal border border-gray-300 rounded-lg text-sm flex-none order-1 self-stretch flex-grow-0 focus:outline-none focus:ring-2 focus:ring-blue-base"
            required
          />
        </div>

        <button
          type="submit"
          className="flex justify-center items-center px-5 w-[316px] h-12 bg-blue-base text-white opacity-50 hover:opacity-100 rounded-lg gap-3 transition-opacity duration-300"
        >
          Salvar link
        </button>
      </form>
      </div>
    </div>
  );
}
