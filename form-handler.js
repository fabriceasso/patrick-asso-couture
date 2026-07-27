// Formulaire de contact - Patrick ASSO Couture
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    function sanitizeInput(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById('form-status');
        var btn = document.getElementById('submit-btn');

        var name = sanitizeInput(form.querySelector('[name="name"]').value.trim());
        var email = form.querySelector('[name="email"]').value.trim();
        var category = form.querySelector('[name="category"]').value;
        var message = sanitizeInput(form.querySelector('[name="message"]').value.trim());

        if (!name || name.length < 2) {
            status.innerText = 'Veuillez entrer un nom valide.';
            status.style.display = 'block';
            return;
        }

        if (!validateEmail(email)) {
            status.innerText = 'Veuillez entrer une adresse email valide.';
            status.style.display = 'block';
            return;
        }

        if (!category) {
            status.innerText = 'Veuillez sélectionner un type de création.';
            status.style.display = 'block';
            return;
        }

        if (!message || message.length < 10) {
            status.innerText = 'Votre message doit contenir au moins 10 caractères.';
            status.style.display = 'block';
            return;
        }

        btn.innerText = 'ENVOI EN COURS...';
        btn.disabled = true;

        var data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('category', category);
        data.append('message', message);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' }
        })
            .then(function (response) {
                if (response.ok) {
                    status.innerText = 'MERCI ! VOTRE DEMANDE A \u00c9T\u00c9 ENVOY\u00c9E.';
                    status.style.display = 'block';
                    btn.innerText = 'ENVOY\u00c9';
                    form.reset();
                } else {
                    response.json().then(function (data) {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerText = data['errors']
                                .map(function (error) {
                                    return error['message'];
                                })
                                .join(', ');
                        } else {
                            status.innerText = 'OUP ! UNE ERREUR S\'EST PRODUITE.';
                        }
                        status.style.display = 'block';
                        btn.innerText = 'RESSAYER';
                        btn.disabled = false;
                    });
                }
            })
            .catch(function () {
                status.innerText = 'PROBL\u00c8ME DE CONNEXION.';
                status.style.display = 'block';
                btn.innerText = 'RESSAYER';
                btn.disabled = false;
            });
    }

    form.addEventListener('submit', handleSubmit);
});
