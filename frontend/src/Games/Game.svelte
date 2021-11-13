<script lang=ts>

	interface IGame {
		name: string;
		id: string;
		type: string;
	}

	export let Game: IGame;


</script>

<div>
	<h1>{Game.name}</h1>
	<small>{Game.id}</small>
	<small>{Game.type}</small>
</div>