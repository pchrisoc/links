<script lang="ts">
	// imports
	import loadingPic from '$lib/assets/ieee-logo.png';
	import { sleep } from '$lib/util';
	import { onMount } from 'svelte';
	import Temporary from '$lib/components/Temporary.svelte';
	import { getLinkFromShort } from '../../lib/api/api';

	// get data from URL
	export let data;

	// control the loading animation
	let trigger = 0;

	// on mount, we wait 0.25 seconds, then trigger the animation
	// then we wait 1.25 seconds, then redirect to the link
	onMount(async () => {
		await sleep(250);
		trigger = 1;
		const {link, status} = await getLinkFromShort(data.short);
		await sleep(1250);
		if (status !== 200) {
			window.location.href = 'https://ieee.studentorg.berkeley.edu/';
			return;
		}
		window.location.href = link;
	});
</script>

<svelte:head>
	<title>Redirecting...</title>
	<meta name="description" content="Redirecting..." />
</svelte:head>

<div class="body">
	<Temporary duration={1000} {trigger}>
		<img src={loadingPic} alt="Redirecting..." />
		<h1>Redirecting...</h1>
	</Temporary>
</div>

<style>
	.body {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		background-color: var(--var-color-grey);

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	img {
		width: 100px;
	}

	h1 {
		font-size: 2rem;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		img {
			width: 100px;
		}
	}
</style>
