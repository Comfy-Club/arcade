<script lang="ts">
import {onMount} from 'svelte';
import Games from './Games/Games.svelte';
import WebSocket from './WebSockets/WebSocket.svelte';
</script>

<main>
	<Games/>
	<WebSocket/>
</main>