<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { confirm } from '../functions.js'
const API_URL = 'http://127.0.0.1:8000/api/students';
export default {
    data() {
        return {
            id: 0,
            first_name: '',
            last_name: '',
            photo: ''
        }
    },
    mounted() {
        const route = useRoute();
        this.getStudent(route.params.id);
    },
    methods: {
        getStudent(userId) {
            axios.get(API_URL + '/' + userId)
                .then((response) => {
                    const data = response.data.data;
                    this.id = data.id;
                    this.first_name = data.first_name;
                    this.last_name = data.last_name;
                    this.photo = data.photo;
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        deleteStudent(id, name) {
            confirm(API_URL, id, 'Eliminar estudiante', `Quieres eliminar a ${name}`);
        }
    }
}
</script>

<template>
    <div class="row mt-3">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Estudiante: {{ `(${this.id}) ` + this.first_name + ' ' + this.last_name }}
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <img v-if="this.photo" :src="this.photo" style="width: 150px !important;"
                                class="img-thumbnail" id="photo">
                            <img v-else style="width: 150px !important;"
                                src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
                                class="img-thumbnail" id="photo">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                <input v-model="first_name" id="first_name" maxlength="50" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Apellido</label>
                                <input v-model="last_name" id="last_name" maxlength="50" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <RouterLink :to="{ path: '/' }" class="btn btn-info"><i class="bi bi-list"></i>
                            </RouterLink>
                            &nbsp;
                            <RouterLink :to="{ name: 'students/edit', params: { id: this.id } }"
                                class="btn btn-warning"><i class="bi bi-pencil-fill"></i></RouterLink>
                            &nbsp;
                            <button class="btn btn-danger"
                                v-on:click="deleteStudent(this.id, this.first_name + ' ' + this.last_name)"><i
                                    class="bi bi-trash-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>