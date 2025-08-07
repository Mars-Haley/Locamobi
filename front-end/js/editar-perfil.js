

const token = localStorage.getItem("token");

if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/front-end/html/index.html";
}

function carregarDados() {
  fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar usuário');
      return response.json();
    })
    .then(data => {
      document.getElementById('edit-name').value = data.name || '';
      document.getElementById('edit-email').value = data.email || '';
      document.getElementById('edit-password').value = '';
      document.getElementById('gender').value = data.genderText;
      document.getElementById('edit-phone').value = data.phoneNumber || '';
      document.getElementById('edit-address').value = data.address || '';
      document.getElementById('edit-photo').value = data.photo || '';
      document.getElementById('cpf').value = data.cpf || '';
      document.getElementById('rg').value = data.rg || '';
      if (data.birthday) {
        document.getElementById('birthday').value = data.birthday.split('T')[0];
      }
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao carregar dados do usuário.');
    });
}

function salvarDados() {
  const updatedUser = {
    id: userId,
    name: document.getElementById('edit-name').value,
    email: document.getElementById('edit-email').value,
    address: document.getElementById('edit-address').value,
    phoneNumber: document.getElementById('edit-phone').value,
    genderText: document.getElementById('gender').value,
    password: document.getElementById('edit-password').value,
    photo: document.getElementById('edit-photo').value,
    cpf: document.getElementById('cpf').value,
    rg: document.getElementById('rg').value,
    birthday: document.getElementById('birthday').value,
  };

  fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedUser)
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao salvar dados');
      alert('Dados atualizados com sucesso!');
      carregarDados();
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao salvar dados');
    });
}

document.getElementById('btn-save').addEventListener('click', salvarDados);
window.onload = carregarDados;