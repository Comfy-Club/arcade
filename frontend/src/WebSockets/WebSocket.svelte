<script lang=ts>
	import { onMount } from 'svelte';
	import store from './store'

	let message;
	let messages = [];

	onMount(() => {
		store.subscribe(currentMessage => {
			messages = [...messages, currentMessage];
		})
	})

	const onSendMessage = () => {
		if (message.length > 0 ) {
			store.sendMessage(message);
			message = '';
		}
	}
</script>

<section>
	<h3>Messages</h3>
	<input type="text" bind:value={message}>
	<button on:click={onSendMessage}>
		Send Message
	</button>
	{#each messages as message, i}
		<p>{message}</p>
	{/each}
</section>

