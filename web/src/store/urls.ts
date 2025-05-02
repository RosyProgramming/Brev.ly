import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Url = {
	id: string;
	originalUrl: string;
	shortUrl: string;
	createdAt: string;
	accessCount: number;
};

type UrlState = {
	urls: Map<string, Url>;
	addUrl: (url: Url) => void;
	deleteUrl: (urlId: string) => void;
};

enableMapSet();

export const useUrls = create<UrlState, [["zustand/immer", never]]>(
	immer((set) => {
		function addUrl(url: Url) {
			set((state) => {
				state.urls.set(url.id, url);
			});
		}

		function deleteUrl(urlId: string) {
			set((state) => {
				state.urls.delete(urlId);
			});
		}

		return {
			urls: new Map<string, Url>(),
			addUrl,
			deleteUrl,
		};
	}),
);