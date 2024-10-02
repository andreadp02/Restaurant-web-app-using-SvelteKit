<script lang="ts">
	import type { PageData } from './$types';

	export let form;
	export let data: PageData;
	const piatti = data.piatti;
	const categorie = data.categorie;
</script>


<section>
	<div class="container">
		<div class="container mt-4 section-title">
			<div><span>Gestione menù</span></div>
			<p class="mt-2 finetext">
				Visualizza, aggiungi, modifica o cambia la disponibilità dei piatti del menù.
			</p>
		</div>
		{#if form?.success === true}<p class="finetext">
				<b>Cambio disponibilità avvenuto con successo</b>
			</p>
		{/if}
		{#if form?.success === false}<p class="finetext"><b>Cambio disponibilità fallito</b></p>
		{/if}

		<a href="/privato/gestioneMenu/piatto/"
			><button class="btn btn-warning mt-3 mb-3">Aggiungi piatto</button></a
		>
		<table class="table table-striped table-hover table-bordered">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Nome</th>
					<th scope="col">Descrizione</th>
					<th scope="col">Prezzo</th>
					<th scope="col">Categoria</th>
					<th scope="col">Disponibile</th>
					<th scope="col">Allergeni</th>
					<th scope="col">Disponibilità</th>
					<th scope="col">Modifica</th>
				</tr>
			</thead>

			<tbody>
				{#each piatti as piatto}
					<tr>
						<th scope="row">{piatto.id}</th>
						<td>{piatto.nome}</td>
						<td>{piatto.descr}</td>
						<td>{piatto.prezzo}</td>
						<td
							>{#each categorie as categoria}
								{#if piatto.categoria === categoria.id}
									{categoria.nome}
								{/if}
							{/each}</td
						>
						<td>
							{#if piatto.disponibile === 1}
								Sì
							{:else}
								No
							{/if}
						</td>
						<td>
							{#each piatto.allergeni as allergene, index}
								{allergene.id}{#if index < piatto.allergeni.length - 1},{' '}{/if}
							{/each}
						</td>
						<td
							><form method="post" action="?/cambiaDisponibilita">
								<input name="piattoId" type="number" value={piatto.id} hidden /><button
									class="btn btn-primary">Cambia</button
								>
							</form></td
						>
						<td>
							<a href="/privato/gestioneMenu/piatto?piattoId={piatto.id}"
								><button class="btn btn-warning">Modifica</button></a
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
