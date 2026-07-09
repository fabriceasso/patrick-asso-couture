// Formulaire de contact - Patrick ASSO Couture
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById('form-status');
        var btn = document.getElementById('submit-btn');
        var data = new FormData(event.target);

        btn.innerText = 'ENVOI EN COURS...';
        btn.disabled = true;

        fetch(event.target.action, {
            method: form.method,
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
