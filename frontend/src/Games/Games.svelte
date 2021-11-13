<script lang=ts>
	import { onMount } from 'svelte';
	import Game from './Game.svelte';

	let Games: object[];
	let Game: object;

	onMount(async () => {
    await fetch(`http://localhost/api/v1/games`)
      .then(r => r.json())
      .then(data => {
		for (let index in data) {
			Games.push(data[index])
			console.log(data[index]);
		}
      });
  })
</script>

{#if Games}
  {#each Games as Game}
    <ul>
      <li>    
        <Game {Game} />
      </li>
    </ul>
  {/each}
{:else}
  <p class="loading">loading...</p>
{/if}