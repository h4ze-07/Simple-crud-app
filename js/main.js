const 
    form = document.getElementById('form'),
    formName = document.getElementById('name'),
    formAge = document.getElementById('age'),
    formJob = document.getElementById('job'),
    confirnBtn = document.getElementById('confirn-user'),
    updateBtn = document.getElementById('update-user'),
    list = document.getElementById('list');



function validateForm() {
    const nameValid = checkName();
    const ageValid = checkAge();
    const jobValid = checkJob();

    return nameValid && ageValid && jobValid;
}


function showUsers() {
    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'))
    }

    let html = '';
    usersList.forEach((element, index) => {
    html += 
        `<div class="list-item">
            <div class="info">
                <p class="showed-info">${index + 1}. ${element.name}</p>
                <p class="hidden-info hide">Age: ${usersList[index].age}, Job: ${usersList[index].job}</p>
            </div>
            <div class="list-item-btns">
                <button class="btn btn-info view-info">View</button>
                <button class="btn btn-danger hide close-info">Close</button>
                <button class="btn btn-warning" onclick="updateData(${index});">Update</button>
                <button class="btn btn-danger" onclick="deleteData(${index});">Delete</button>
            </div>
        </div>`;
    });

    list.innerHTML = '';
    list.insertAdjacentHTML("beforeend", html);
    viewData();
}

document.onload = showUsers();

confirnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createUser();
})

function createUser() {
    if(validateForm() == true) {
        let name = formName.value;
        let age = formAge.value;
        let job = formJob.value;

        let usersList;
        if (localStorage.getItem('usersList') == null) {
            usersList = [];
        } else {
            usersList = JSON.parse(localStorage.getItem('usersList'))
        }

        usersList.push({
            name: name,
            age: age,
            job: job,
        })

        localStorage.setItem('usersList', JSON.stringify(usersList));
        showUsers();

        formName.value = '';
        formAge.value = '';
        formJob.value = '';

        formName.classList.remove('correct');
        formAge.classList.remove('correct');
        formJob.classList.remove('correct');
    }
}

function checkName() {
    if (/^[a-zA-Zа-яА-Я]{2,}/gm.test(formName.value)) {
        formName.classList.remove('wrong')
        formName.classList.add('correct')
        return true;
    } else {
        formName.classList.remove('correct')
        formName.classList.add('wrong')
        return false;
    }
}

function checkAge() {
    if (formAge.value === '' || parseInt(formAge.value) <= 0 || parseInt(formAge.value) >= 120) {
        formAge.classList.remove('correct')
        formAge.classList.add('wrong')
        return false
    } else {
        formAge.classList.remove('wrong')
        formAge.classList.add('correct')
        return true;
    }
}

function checkJob() {
    if (/^[a-zA-Zа-яА-Я]{2,}/gm.test(formJob.value)) {
        formJob.classList.remove('wrong')
        formJob.classList.add('correct')
        return true;
    } else {
        formJob.classList.remove('correct')
        formJob.classList.add('wrong')
        return false
    }
}


function viewData() {
    const viewButtons = document.getElementsByClassName('view-info');
    const infos = document.getElementsByClassName('hidden-info');
    for (let i = 0; i < viewButtons.length; i++) {
        viewButtons[i].addEventListener('click', function () {
            infos[i].classList.toggle('hide')
        })
    }
}

function updateData(index) {
    confirnBtn.classList.add('hide');
    updateBtn.classList.remove('hide');

    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'))
    }

    formName.value = usersList[index].name;
    formAge.value = usersList[index].age;
    formJob.value = usersList[index].job;

    updateBtn.addEventListener('click', (e) => {
        if (validateForm() == true) {
            usersList[index].name = formName.value;
            usersList[index].age = formAge.value;
            usersList[index].job = formJob.value;
        
            localStorage.setItem('usersList', JSON.stringify(usersList));
            showUsers();

            formName.value = '';
            formAge.value = '';
            formJob.value = '';

            confirnBtn.classList.remove('hide');
            updateBtn.classList.add('hide');
        }
    })
}

function deleteData(index) {
    let usersList;
    if (localStorage.getItem('usersList') == null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem('usersList'))
    }
    
    let conf = confirm('Are you sure?')
    if (conf) {
        usersList.splice(index, 1);
        localStorage.setItem('usersList', JSON.stringify(usersList));
        showUsers();
    }
}