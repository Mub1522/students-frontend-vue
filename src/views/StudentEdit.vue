<script>
import { showAlert, sendRequest } from '@/functions';
import { useRoute } from 'vue-router';
import axios from 'axios';
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
        updateStudent(event) {
            document.getElementById('sendForm').disabled = true;
            event.preventDefault();
            console.log(this)
            if (this.first_name.trim() === '') {
                showAlert('warning', 'Ingrese el nombre', 'first_name')
            }
            else if (this.last_name.trim() === '') {
                showAlert('warning', 'Ingrese el apellido', 'last_name')
            } else {
                let data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    photo: this.photo
                }
                sendRequest('PUT', data, API_URL + '/' + this.id);
            }
        },
        previewPhoto(event) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (e) => {
                this.photo = e.target.result;
            }
        }
    }
}
</script>

<template>
    <div class="row mt-3">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">
                    Editar estudiante
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
                    <form class="mt-4" v-on:submit="updateStudent">
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
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Foto del estudiante</label>
                            <input class="form-control" type="file" id="formFile"
                                accept="image/png, image/jpg, image/jpeg, image/gif" v-on:change="previewPhoto">
                        </div>
                        <button type="submit" class="btn btn-success" id="sendForm"><i class="bi bi-check-square"></i>
                            Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>