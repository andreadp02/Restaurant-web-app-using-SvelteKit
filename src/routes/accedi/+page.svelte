<script>
	import Footer from '../footer.svelte';
	import Header from '../header.svelte';

	export let form;
</script>

<Header></Header>

<!-- Contact Section -->
<section id="contact" class="contact section">
	<!-- Section Title -->
	<div class="container mt-4 section-title">
		<h2>Login</h2>
		<div><span>Benvenuto</span></div>
		<p class="mt-2 finetext">Inserisci le credenziali per accedere all'area riservata</p>
	</div>
	<!-- End Section Title -->

	<div class="container">
		<div class="row gy-5 gx-lg-5">
			{#if form?.incorrect}<div class="text-center">
				<span><b>Credenziali errate</b></span>
			</div>{/if}
			<div class="col"></div>
			<div class="col-lg-8">
				<form method="post" class="form">
					<div class="row">
						<div class="form-group">
							{#if form?.incorrect === true}
							<input
							type="email"
							name="email"
							class="form-control"
							id="email"
							placeholder="Email"
							value={form?.email}
							required
						/>
							{:else}
							<input
								type="email"
								name="email"
								class="form-control"
								id="email"
								placeholder="Email"
								required
							/>
							{/if}
						</div>
						<div class="form-group mt-3 mt-md-3">
							<input
								type="password"
								class="form-control"
								name="password"
								id="name"
								placeholder="Password"
								required
							/>
						</div>
					</div>
					<div class="text-center mt-3"><button type="submit">Accedi</button></div>
				</form>
			</div>
			<!-- End Contact Form -->
			<div class="col"></div>
		</div>
	</div>
</section>
<!-- /Contact Section -->
<Footer></Footer>