<script lang=ts>
	import { onMount } from 'svelte';
	import Game from './Game.svelte';

  interface Game {
    name: String,
    id: String,
    type: String
  }

	let gameList: Game[];

	onMount(async () => {
    await fetch(`http://localhost:3000/api/v1/games`)
      .then(response => response.json())
      .then(data => { 
        let a = Object.entries(data)
        gameList = a.map(value => { return value[1] }) as Game[]
      })
      .catch(err => console.error(err));
  });

</script>

{#if gameList}
  {#each gameList as gameObject}    
    <Game game={gameObject} />
  {/each}
{/if}
