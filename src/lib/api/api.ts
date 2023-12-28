import { hash, validateUrl } from '$lib/util';
import { type LinkDoc, type LinkDocSend } from './types';

const backendUrl = 'http://localhost:3333';

/**
 * Checks if the link is already in the links collection.
 * @param link The link to check.
 */
const linkExists = async (link: string): Promise<boolean> => {
    const res = await fetch(`${backendUrl}/api/${link}`);
    return res.ok;
}

/**
 * Checks if the short ID is already in the links collection.
 * @param short The short ID to check.
 */

const shortExists = async (short: string): Promise<boolean> => {
    const res = await fetch(`${backendUrl}/link/${short}`);
    return res.ok;
}

/**
 * Adds a link to the links collection, and returns the shortened version of the link.
 * @param link The link to add to the links collection.
 */
const addLink = async (link: string, customShort?: string): Promise<string> => {
	// 1. if the link isn't valid, throw an error
	if (!validateUrl(link)) {
		throw new Error(`INVALID_LINK`);
	}

	// 3. if the link already exists, return the shortened version of the link instead of adding it again
	const existsAlr = await linkExists(link);
	const isShort = customShort ? true : false;
	if (existsAlr && !isShort) {
		return await getShortFromLink(link);
	} else if (existsAlr && isShort) {
		throw new Error(`ALREADY_ALIASED`);
	}

	// 2. generate a short for the link, or throw an error if the custom one they provided already exists
	let short = '';
	if (customShort) {
		// if a custom short ID is provided, use that
		if (await shortExists(customShort)) {
			// as long as it doesn't already exist
			throw new Error(`CUSTOM_SHORT_EXISTS`);
		}
		short = customShort;
	} else {
		// otherwise, generate a new one
		do {
			short = hash(link);
		} while (await shortExists(short)); // as long as it doesn't already exist
	}
    
    const linkDoc: LinkDocSend = {
        origUrl: link,
        shortUrl: short
    }
    await fetch(`${backendUrl}/api/short`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(linkDoc)
    });
    return short;
}

/**
 * Gets the short ID from the links collection.
 * @param link The link to get the short ID for.
 */
const getShortFromLink = async (link: string): Promise<string> => {
    const res = await fetch(`${backendUrl}/api/${link}`);
    const short = await res.text();
    return short;
}

/**
 * Gets the link from the links collection.
 * @param short The short ID to get the link for.
 */
const getLinkFromShort = async (short: string): Promise<string> => {
    const res = await fetch(`${backendUrl}/link/${short}`);
    const link = await res.text();
    return link;
}

/** 
 * Get all links from the links collection.
 */
const getAllLinks = async (): Promise<LinkDoc[]> => {
    const res = await fetch(`${backendUrl}/api/all`);
    const links = await res.json();
    return links;
}

export { addLink, getShortFromLink, getLinkFromShort, getAllLinks };