import Swal from "sweetalert2";
import axios from "axios";

export function showAlert(icon, title, focus = '') {
    if (focus != '') {
        document.getElementById(focus).focus();
    }
    Swal.fire({
        icon: icon,
        title: title,
        customClass: {
            confirmButton: 'btn btn-primary',
            popup: 'animated zoonIn'
        },
        buttonsStyling: false
    });
}

export function confirm(url, id, title, message) {
    let urlRequest = url + '/' + id;
    const swalConfigs = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
            popup: 'animated zoomIn'
        }
    });

    swalConfigs.fire({
        icon: 'question',
        title: title,
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
        cancelButtonText: 'No, cancelar!',
    }).then((result) => {
        if (result.isConfirmed) {
            sendRequest('DELETE', { id: id }, urlRequest)
        }
    });
}

export function sendRequest(method, data, url) {
    axios({ method: method, url: url, data: data })
        .then(function (response) {
            showAlert(response.data.status, response.data.message)
            window.setTimeout(function () { window.location.href = '/' }, 2000)
        })
        .catch(function (error) {
            showAlert(response.data.status, error.response.data.message)
        });
}

