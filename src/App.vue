<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Academy-Code</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Inicio</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estudiantes
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/">Listar</RouterLink>
                <RouterLink class="dropdown-item" to="/students/create">Crear</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Content -->
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped></style>
