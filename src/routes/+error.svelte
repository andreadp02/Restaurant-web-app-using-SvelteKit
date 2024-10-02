<script lang="ts">
    import { page } from '$app/stores';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
</script>
<Header></Header>

<br><br>
<section id="hero" class="hero section light-background">
<div class="container mt-5">
    <div class="container section-title">
<h1>Errore {$page.status}</h1>
<div class="container mt-4"><h3>Torna alla Home</h3></div>
<a href="/" class="btn-get-started">Home</a>
</div>
</div>
</section>


<Footer/>