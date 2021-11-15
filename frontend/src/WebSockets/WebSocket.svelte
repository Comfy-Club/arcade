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

{#each messages as message, i}
	<div>
		<p>{message}</p>
	</div>
{/each}

