import {openBlock, closeBlock} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerID) {

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'fail'
    }
    forms.forEach(item => {
        bindPostData(item);
    })



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // request.send(json);

            postData('http://localhost:3000/requests\n', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openBlock('.modal', modalTimerID);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeBlock('.modal');
        }, 4000);
    }

    fetch(' http://localhost:3000/menu\n')
        .then(data => data.json())
    // .then(item=> console.log(item))
};
export default forms;