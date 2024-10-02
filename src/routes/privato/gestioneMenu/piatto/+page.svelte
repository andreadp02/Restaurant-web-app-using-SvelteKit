<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form;
	let piatto = data.piatto;
	let categorie = data.categorie;
	let allergeni = data.allergeni;
	let allergeniPiatto = data.allergeniPiatto;
	let modifica = false;
	if (piatto !== null) {
		modifica = true;
	}

	let check: boolean[] = [];
	if (allergeniPiatto) {
		for (let allergene of allergeni) {
			for (let checkedAllergene of allergeniPiatto) {
				if (checkedAllergene.id === allergene.id) {
					check[allergene.id] = true;
				}
			}
			if (check[allergene.id] != true) {
				check[allergene.id] = false;
			}
		}
	}
</script>

<!-- Contact Section -->
<section id="contact" class="contact section">
	<!-- Section Title -->
	<div class="container mt-4 section-title">
		<div>
			<span
				>{#if modifica}Modifica{:else}Aggiungi{/if} piatto</span
			>
		</div>
	</div>
	<!-- End Section Title -->

	<div class="container">
		<div class="row gy-5 gx-lg-5">
			{#if form?.missingName}<div class="text-center">
					<span><b>Il nome non può essere nullo</b></span>
				</div>{/if}
			{#if form?.incorrectId}<div class="text-center">
					<span><b>L'ID deve essere un numero</b></span>
				</div>{/if}

			{#if !form?.success && form?.id === 0}<div class="text-center">
					<span><b>Aggiunta fallita</b></span>
				</div>
			{/if}
			{#if !form?.success && form?.id === 1}<div class="text-center">
					<span><b>Modifica fallita</b></span>
				</div>
			{/if}
			{#if !form?.success && form?.id === 2}<div class="text-center">
					<span><b>Aggiunta degli allergeni al piatto {form.piattoId} fallita</b></span>
				</div>
			{/if}
			{#if !form?.success && form?.id === 3}<div class="text-center">
					<span><b>Modifica degli allergeni al piatto {form.piattoId} fallita</b></span>
				</div>
			{/if}
			<div class="col"></div>
			<div class="col-lg-8">
				<form method="post" use:enhance enctype="multipart/form-data" class="form">
					<div class="row">
						{#if modifica}
							<div class="col-md-6 form-group">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<div class="text-center">
									<label><b> ID </b> </label>
									<input
										type="number"
										name="piattoId"
										class="form-control"
										value={piatto?.id}
										readonly
									/>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<div class="text-center">
									<label><b> Nome </b> </label>
									<input type="text" class="form-control" name="nome" value={piatto?.nome} />
								</div>
							</div>
						{:else}
							<div class="form-group">
								<!-- svelte-ignore a11y-label-has-associated-control -->
								<div class="text-center">
									<label><b> Nome </b> </label>
									<input type="text" class="form-control" name="nome" placeholder="Nome" />
								</div>
							</div>
						{/if}
						<div class="form-group mt-3">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label><b> Descrizione </b> </label>
								{#if modifica}
									<textarea class="form-control" name="descr" value={piatto?.descrizione} />
								{:else}
									<textarea class="form-control" name="descr" placeholder="Descrizione" />
								{/if}
							</div>
						</div>
						<div class="col-md-6 form-group mt-3">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label><b> Prezzo </b> </label>
								{#if modifica}
									<input
										type="number"
										class="form-control"
										name="prezzo"
										value={piatto?.prezzo}
										step=".01"
									/>
								{:else}
									<input
										type="number"
										class="form-control"
										name="prezzo"
										step=".01"
										placeholder="Prezzo"
									/>
								{/if}
							</div>
						</div>
						<div class="col-md-6 form-group mt-3">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label><b> Categoria </b> </label>
								<select class="form-control" name="categoria">
									{#each categorie as categoria}
										{#if piatto?.categoria === categoria.id}
											<option value={categoria.id} selected>{categoria.nome}</option>
										{:else}
											<option value={categoria.id}>{categoria.nome}</option>
										{/if}
									{/each}
								</select>
							</div>
						</div>
						<div class="col-md-6 form-group mt-3">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label><b> Disponibile </b> </label>
								<select class="form-control" name="disponibile">
									{#if piatto?.disponibile === 1}
										<option value="1" selected>Sì</option>
										<option value="0">No</option>
									{:else}
										<option value="1">Sì</option>
										<option value="0" selected>No</option>
									{/if}
								</select>
							</div>
						</div>

						<div class="col-md-6 form-group mt-3">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label for="file"><b>Immagine</b></label> <br />
								<input
									type="file"
									id="file"
									name="fileToUpload"
									accept=".jpg, .jpeg, .png, .webp"
								/>
							</div>
						</div>
						<div class="form-group mt-3">
							<b> Allergeni </b>
							{#each allergeni as allergene}
								<div class="form-group">
									{#if check[allergene.id] === true}
										<label
											><input
												type="checkbox"
												name="allergene {allergene.id}"
												value={allergene.id}
												checked
											/>
											{allergene.nome}
										</label>
									{:else}
										<label
											><input
												type="checkbox"
												name="allergene {allergene.id}"
												value={allergene.id}
											/>
											{allergene.nome}
										</label>
									{/if}
								</div>
							{/each}
						</div>
						<div class="text-center"><button type="submit">Invia</button></div>
					</div>
				</form>
			</div>
			<!-- End Contact Form -->
			<div class="col"></div>
		</div>
	</div>
</section>
<!-- /Contact Section -->
