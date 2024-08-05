<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { confirm } from '../functions.js'
const API_URL = 'http://127.0.0.1:8000/api/students';
export default {
  data() {
    return {
      students: null,
      loading: true
    }
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.loading = true
      axios.get(API_URL).then(
        res => {
          this.students = res.data.data;
          this.loading = false;
        }
      );
    },
    deleteStudent(id, name) {
      confirm(API_URL, id, 'Eliminar estudiante', `Quieres eliminar a ${name}`);
    }
  }
}
</script>

<template>
  <div class="row mt-2">
    <div class="col-lg-12">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Foto</th>
              <th scope="col">Creado el</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-if="this.loading">
              <td colspan="6">
                <h3>Cargando...</h3>
              </td>
            </tr>
            <tr v-else v-for="students, index in this.students" :key="students.id">
              <td v-text="index + 1"></td>
              <td v-text="students.id"></td>
              <td v-text="students.first_name + ' ' + students.last_name"></td>
              <td>
                <img v-if="students.photo" style="width: 150px !important;" :src="students.photo" class="img-thumbnail">
                <img v-else style="width: 150px !important;"
                  src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" class="img-thumbnail">
              </td>
              <td v-text="new Date(students.created_at).toLocaleDateString('en-US')"></td>
              <td>
                <RouterLink :to="{ name: 'students/view', params: { id: students.id } }" class="btn btn-info"><i
                    class="bi bi-eye-fill"></i></RouterLink>
                &nbsp;
                <RouterLink :to="{ name: 'students/edit', params: { id: students.id } }" class="btn btn-warning"><i
                    class="bi bi-pencil-fill"></i></RouterLink>
                &nbsp;
                <button class="btn btn-danger"
                  v-on:click="deleteStudent(students.id, students.first_name + ' ' + students.last_name)"><i
                    class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
