<script lang="ts">
	import Chisiamo from './chisiamo.svelte';
	import Contatti from './contatti.svelte';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
</script>

<Header></Header>

<main class="main">
	<!-- Hero Section -->
	<section id="hero" class="hero section dark-background">
		<div class="container mb-5">
			<div class="carousel-item active">
				<img src="/assets/img/hero-carousel/hero-carousel-1.jpg"
				 alt="hero-img" />
				<div class="carousel-container">
					<h2>Ristorante <span>Le delizie</span></h2>
					<p>
						Esplora il menu: un viaggio tra gusto e creatività.
						Ingredienti di prima scelta si
						uniscono in piatti che fondono tradizione e innovazione,
						promettendo un'esperienza
						culinaria unica. Ogni boccone racconta
						una storia di passione ed eccellenza.
					</p>
					<div>
						<a href="/menu" class="btn-get-started">Menu</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- /Hero Section -->
</main>

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br
	/><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

<Chisiamo />

<Contatti />

<Footer></Footer>
