<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="about-column">
	<h1>About Links</h1>

	<p>
	IEEE Links is a link shortener for IEEE at UC Berkeley. It is a redirect hub for all things IEEE at Berkeley.
	</p>

	<p>
		Created by Ryan Ma, credits to Daniel Wei for the original design at <a href="https://hyperdt.in/">hyperdt.in</a>.
	</p>
</div>

<style>
	.about-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: clamp(300px, 50%, 600px);
	}

	p {
		text-align: center;
	}
</style>
