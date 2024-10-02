<script lang="ts">
	import type { PageData } from './$types';
	export let form;
	export let data: PageData;
	const allergeni = data.allergeni;
</script>

<section>
	<div class="container">
		<div class="container mt-4 section-title">
			<div><span>Gestione allergeni</span></div>
			<p class="mt-2 finetext">Visualizza, aggiungi, modifica o elimina gli allergeni.</p>
		</div>
		{#if form?.success && form?.id === 2}<p class="finetext">
				<b>Eliminazione avvenuta con successo</b>
			</p>
		{/if}
		{#if !form?.success && form?.id === 2}<p class="finetext"><b>Eliminazione fallita</b></p>
		{/if}

		<a href="/privato/gestioneAllergeni/allergene"
			><button class="btn btn-warning mt-3 mb-3"> Aggiungi allergene</button></a
		>
		<table class="table table-striped table-hover table-bordered">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Nome</th>
					<th scope="col">Modifica</th>
					<th scope="col">Elimina</th>
				</tr>
			</thead>

			<tbody>
				{#each allergeni as allergene}
					<tr>
						<th scope="row">{allergene.id}</th>
						<td>{allergene.nome}</td>
						<td
							><a href="/privato/gestioneAllergeni/allergene?allergeneId={allergene.id}"
								><button class="btn btn-warning">Modifica</button></a
							></td
						>
						<td
							><form method="post" action="?/delete">
								<input name="allergeneId" type="number" value={allergene.id} hidden /><button
									class="btn btn-danger">Elimina</button
								>
							</form></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
