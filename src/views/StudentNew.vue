<script>
import { showAlert, sendRequest } from '@/functions';
const API_URL = 'http://127.0.0.1:8000/api/students';
export default {
    data() {
        return {
            first_name: '',
            last_name: '',
            photo: '',
        }
    },
    methods: {
        saveStudent(event) {
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
                sendRequest('POST', data, API_URL);
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
                    Registrar estudiante
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
                    <form class="mt-4" v-on:submit="saveStudent">
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
                            Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>