import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

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
};

enableMapSet();

export const useLinks = create<LinkState, [["zustand/immer", never]]>(
	immer((set) => {
		function addLink(link: Link) {
			set((state) => {
				state.links.set(link.id, link);
			});
		}

		function deleteLink(linkId: string) {
			set((state) => {
				state.links.delete(linkId);
			});
		}

		return {
			links: new Map<string, Link>(),
			addLink,
			deleteLink,
		};
	}),
);