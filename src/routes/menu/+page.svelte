<script lang="ts">
	import type { PageData } from '../$types';
	import Footer from '../footer.svelte';
	import Header from '../header.svelte';

	export let data;
	const piatti = data.piatti;
	const allergeni = data.allergeni;
	const categorie = data.categorie;

	let selected = 1;
	let filteredPiatti: {
		id: number;
		nome: string;
		descr: string;
		prezzo: number;
		categoria: number;
		disponibile: number;
		img: string | null;
		allergeni: {
			id: number;
			nome: string;
		}[];
	}[] = piatti.filter((piatto) => piatto.categoria === selected);

	function handleClick(categoria: number) {
		selected = categoria;
		return (
			filteredPiatti = piatti.filter((piatto) => piatto.categoria === selected)
		);
	}

	function formatPrezzo(prezzo: number) {
		let formattedPrice = prezzo.toFixed(2);
		formattedPrice = formattedPrice.replace('.', ',');
		return formattedPrice;
	}
</script>

<Header></Header>

<!-- Menu Section -->
<section id="menu" class="menu section">
	<!-- Section Title -->
	<div class="container mt-4 section-title">
		<h1>Menù</h1>
	</div>
	<!-- End Section Title -->

	<div class="container">
		<div class="row">
			<div class="col-lg-12 d-flex justify-content-center">
				<ul class="menu-filters">
					{#each categorie as categoria}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<!-- svelte-ignore a11y-missing-attribute -->
						<li class={categoria.id === selected ? 'filter-active' : ''}>
							<a on:click={() => handleClick(categoria.id)}>{categoria.nome}</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<!-- Menu Filters -->

		<div class="row">
			{#each filteredPiatti as piatto}
				{#if piatto.disponibile === 1}
					<div class="col-lg-6 menu-item">
						{#if piatto.img}
							<img src="menuimg/{piatto.img}" class="menu-img" alt="" />
						{/if}
						<div class="menu-content">
							<!-- svelte-ignore a11y-missing-attribute -->
							<a>{piatto.nome}</a>
							<span>€{formatPrezzo(piatto.prezzo)}</span>
						</div>
						<div class="menu-ingredients">
							{piatto.descr}
						</div>
						<div class="col menu-ingredients">
							{#if piatto.allergeni.length > 0}
								<span><b>Allergeni:</b></span>
								{#each piatto.allergeni as allergene}
									{allergene.id} : {allergene.nome}
									<br />
								{/each}
							{/if}
						</div>
					</div>
					<!-- Menu Item -->
				{/if}
			{/each}
		</div>
		<!-- Menu Container -->
	</div>

	<div class="container col-lg-12 menu-item">
		<h3>Legenda allergeni</h3>
		<div class="finetext">
			{#each allergeni as allergene}
				<p>{allergene.id} : {allergene.nome}</p>
			{/each}
		</div>
	</div>
</section>
<!-- /Menu Section -->
<Footer></Footer>
