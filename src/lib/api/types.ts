import { getTime } from '$lib/util';

/**
 * The type of each document in the links collection.
 */
type LinkDoc = {
	url: string;
	short: string;
	timestamp?: number;
};

type LinkDocSend = {
	origUrl: string;
	shortUrl: string;
}

export { type LinkDoc, type LinkDocSend };
