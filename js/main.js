import {users} from './data.js';


const 
    createBtn = document.getElementById('create'),
    form = document.getElementById('form'),
    formName = document.getElementById('name'),
    formAge = document.getElementById('age'),
    formJob = document.getElementById('job'),
    confirnBtn = document.getElementById('confirn-user'),
    list = document.getElementById('list');

const noUserP = `<p class="no-users">There is no users yet(</p>`

window.onload = () => {
    users.length > 0 ? list.insertAdjacentHTML('beforeend', noUserP) : console.log(users)
}

createBtn.addEventListener('click', (e) => {
    
    createBtn.textContent === 'Create user' ? createBtn.textContent = 'Close form' : createBtn.textContent = 'Create user';
    form.classList.toggle('hide');
})

confirnBtn.addEventListener('click', (e) => {
    e.preventDefault();


})

function checkName() {
    if (formName.value === '') {
        
    }
}

function checkAge() {

}

function checkJob() {

}