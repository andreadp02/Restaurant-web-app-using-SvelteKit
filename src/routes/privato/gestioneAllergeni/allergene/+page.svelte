<script lang="ts">
	export let data;
	export let form;
	let allergeneId = data.allergeneId;
	let modifica = false;
	if (allergeneId !== null) {
		modifica = true;
	}
</script>

<!-- Contact Section -->
<section id="contact" class="contact section">
	<!-- Section Title -->
	<div class="container mt-4 section-title">
		<div>
			<span
				>{#if modifica}Modifica{:else}Aggiungi{/if} allergene</span
			>
		</div>
	</div>
	<!-- End Section Title -->

	<div class="container">
		<div class="row gy-5 gx-lg-5">
			{#if form?.missingId}<div class="text-center">
					<span><b>L' ID non può essere nullo</b></span>
				</div>{/if}
			{#if form?.missingName}<div class="text-center">
					<span><b>Il nome non può essere nullo</b></span>
				</div>{/if}
			{#if form?.incorrectId}<div class="text-center">
					<span><b>L'ID deve essere un numero</b></span>
				</div>{/if}

			{#if !form?.success && form?.id === 0}<p>Aggiunta fallita</p>
			{/if}
			{#if !form?.success && form?.id === 1}<p>Modifica fallita</p>
			{/if}
			<div class="col"></div>
			<div class="col-lg-8">
				<form method="post" action="" class="form">
					<div class="row">
						<div class="form-group">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label><b> ID </b> </label>
								{#if modifica}
									<input
										type="number"
										name="allergeneId"
										class="form-control"
										value={allergeneId}
										readonly
									/>
								{:else}
									<input type="number" name="allergeneId" class="form-control" placeholder="ID" required/>
								{/if}
							</div>
						</div>
						<div class="form-group mt-3 mt-md-3">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<div class="text-center">
								<label><b> Nome </b> </label>
								<input type="text" class="form-control" name="allergeneNome" placeholder="Nome" required/>
							</div>
						</div>
					</div>
					<div class="text-center"><button type="submit">Invia</button></div>
				</form>
			</div>
			<!-- End Contact Form -->
			<div class="col"></div>
		</div>
	</div>
</section>
<!-- /Contact Section -->
