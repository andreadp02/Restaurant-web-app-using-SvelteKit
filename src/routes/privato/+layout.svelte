<!-- Header privato-->
<script lang="ts">
    let isMenuOpen = false;
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
</script>

<header id="header" class="header fixed-top">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a href="/privato/logout" class="logo d-flex align-items-center">
          <h1 class="d-none d-md-block">Le Delizie</h1>
        </a>
        <button class="navbar-toggler" type="button" on:click={toggleMenu} aria-controls="navbarNavAltMarkup" aria-expanded={isMenuOpen} aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" class:show={isMenuOpen} class:bg-white={isMenuOpen} id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <h1 class="d-block d-md-none" style="color:black">Le Delizie</h1>
            <a class="nav-link"  href="/privato">Home</a>
            <a class="nav-link" href="/privato/gestioneMenu/">Gestione menù</a>
            <a class="nav-link" href="/privato/gestioneAllergeni/">Gestione allergeni</a>
            <form method="post" action="/privato/logout">
              <button class="nav-link" type="submit">Esci</button>
            </form>
            
          </div>
        </div>
      </div>
    </nav>
</header>
<br>

<slot></slot>