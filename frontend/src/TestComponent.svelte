<script lang=ts>
	import { onMount } from 'svelte';
	let response: object;

	onMount(async () => {
    await fetch(`http://localhost:3000/`)
      .then(r => r.json())
      .then(data => {
		response = JSON.stringify(data);
      });
  })
</script>

<pre>{response}</pre>