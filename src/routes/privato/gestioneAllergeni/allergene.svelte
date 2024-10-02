<script lang="ts">
	/** @type {import('./$types').ActionData} */
	export let form;
	export let data;
	const allergeni = data.allergeni;
</script>

CRUD allergene
<form method="POST" action="?/create"> 
    {#if form?.missingId}<p class="error">L'ID non può essere nullo</p>{/if}
	{#if form?.missingName}<p class="error">Il nome non può essere nullo</p>{/if}
	{#if form?.incorrectId}<p class="error">L'ID deve essere un numero</p>{/if}

	{#if form?.success && form?.id === 0}<p> Aggiunta avvenuta con successo</p> {/if}
	{#if !form?.success && form?.id === 0}<p> Aggiunta fallita</p> {/if}

	{#if !form?.success && form?.id === 1}<p> Modifica fallita</p> {/if}

	{#if form?.success && form?.id === 2}<p> Eliminazione avvenuta con successo</p> {/if}
	{#if !form?.success && form?.id === 2}<p> Eliminazione fallita</p> {/if}

	<label>
		ID
		<input name="allergeneId" type="number">
	</label>
    <br> <br>
	<label>
		Nome
		<input name="allergeneNome" type="text">
	</label>
	<button>Invia</button>
	<button formaction="?/delete"> Elimina</button>
</form>

{#each allergeni as allergene}
<p>{allergene.id} : {allergene.nome}</p>
{/each} 