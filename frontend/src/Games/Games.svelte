<script lang=ts>
	import { onMount } from 'svelte';
	import Game from './Game.svelte';
  import getGames from '../ts/requests';

  import type IGame from '../ts/interfaces';

	let gameList: IGame[];

	onMount(async () => {
    gameList = await getGames();
    console.log(`Games.svelte: ${gameList}`)
  });

</script>

{#if gameList}
  {#each gameList as gameObject}    
    <Game game={gameObject} />
  {/each}
{/if}
