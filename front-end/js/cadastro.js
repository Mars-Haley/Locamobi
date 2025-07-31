let signupData = {};

// Máscaras para inputs
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

document.getElementById('rg').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1})$/, '$1-$2');
    e.target.value = value;
});

document.getElementById('phoneNumber').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
    e.target.value = value;
});

// Controle do checkbox "Não possuo RG"
document.getElementById('noRg').addEventListener('change', function (e) {
    const rgInput = document.getElementById('rg');

    if (e.target.checked) {
        // Desabilitar campo RG
        rgInput.disabled = true;
        rgInput.value = '';
        rgInput.required = false;
        rgInput.classList.add('bg-gray-100', 'cursor-not-allowed');
        rgInput.classList.remove('input-focus');
    } else {
        // Habilitar campo RG
        rgInput.disabled = false;
        rgInput.required = true;
        rgInput.classList.remove('bg-gray-100', 'cursor-not-allowed');
        rgInput.classList.add('input-focus');
    }
});

// Validação do Step 1
function validateStep1() {
    const form = document.getElementById('signupFormStep1');
    const formData = new FormData(form);

    // Validar se senhas coincidem
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Armazenar dados do Step 1
    signupData = {
        name: formData.get('name'),
        email: formData.get('email'),
        gender: parseInt(formData.get('gender')),
        birthday: formData.get('birthday'),
        phoneNumber: formData.get('phoneNumber'),
        password: formData.get('password')
    };

    // Passar para Step 2
    closeSignupModalStep1();
    showSignupModalStep2();
}

// Submeter cadastro
async function submitSignup() {
    const form = document.getElementById('signupFormStep2');
    const formData = new FormData(form);

    // Combinar dados dos dois steps
    const finalData = {
        ...signupData,
        cpf: formData.get('cpf').replace(/\D/g, ''), // Remove formatação
        rg: document.getElementById('noRg').checked ? null : formData.get('rg').replace(/\D/g, ''), // RG opcional
        address: formData.get('address'),
        cityId: parseInt(formData.get('cityId'))
    };

    try {
        const response = await fetch('https://localhost:7082/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            closeSignupModalStep2();
            showLogin();
        } else {
            const error = await response.text();
            alert('Erro no cadastro: ' + error);
        }
    } catch (error) {
        alert('Erro de conexão: ' + error.message);
    }
}

// Funções para controlar modais (implementar conforme necessário)
function closeSignupModalStep1() {
    document.getElementById('signupModalStep1').classList.add('hidden');
}

function showSignupModalStep1() {
    document.getElementById('signupModalStep1').classList.remove('hidden');
}

function closeSignupModalStep2() {
    document.getElementById('signupModalStep2').classList.add('hidden');
}

function showSignupModalStep2() {
    document.getElementById('signupModalStep2').classList.remove('hidden');
}

function showLogin() {
    // Implementar conforme necessário
    console.log('Mostrar modal de login');
}

// Carregar cidades (implementar conforme sua API)
async function loadCities() {
    try {
        const response = await fetch('https://localhost:7082/City');
        const cities = await response.json();

        const select = document.getElementById('cityId');
        cities.data.forEach(city => {
            const option = document.createElement('option');
            option.value = city.id;
            option.textContent = city.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar cidades:', error);
    }
}

// Carregar cidades quando a página carregar
document.addEventListener('DOMContentLoaded', loadCities);