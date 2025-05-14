import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { api } from "../http/api-fetch"; // Certifique-se de que o arquivo api-fetch está correto

export type Link = {
	id: string;
	originalUrl: string;
	shortUrl: string;
	createdAt: string;
	accessCount: number;
};

type LinkState = {
	links: Map<string, Link>;
	addLink: (link: Link) => void;
	deleteLink: (linkId: string) => void;
	setLinks: (linksArray: Link[]) => void;
	fetchLinks: () => Promise<void>;
};

enableMapSet();

export const useLinks = create<LinkState, [["zustand/immer", never]]>(
	immer((set) => {
		// Função para adicionar um link
		function addLink(link: Link) {
			set((state) => {
				state.links.set(link.id, link);
			});
		}

		// Função para deletar um link
		async function deleteLink(linkId: string) {
			try {
				await api.delete(`/link/${linkId}`); // ajuste a rota conforme sua API

				set((state) => {
					state.links.delete(linkId);
				});
			} catch (error) {
				console.error("Erro ao deletar link no backend:", error);
			}
		}
		
		// Função para definir os links no estado
		function setLinks(linksArray: Link[]) {
			set((state) => {
				// Converte o array de links para um Map
				state.links = new Map(linksArray.map((link) => [link.id, link]));
			});
		}

		// Função para buscar links da API
		async function fetchLinks() {
			const response = await api.get("/link"); 
			if (response.data.links && Array.isArray(response.data.links)) {
				setLinks(response.data.links);
			} else {
				console.error("A resposta da API não contém uma lista de links.");
			}
		}

		return {
			links: new Map<string, Link>(), 
			addLink,
			deleteLink,
			setLinks,
			fetchLinks, 
		};
	})
);
