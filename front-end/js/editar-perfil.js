const userId = 2; // ajuste para o usuário correto
const apiUrl = `https://localhost:7082/User/${userId}`; // ajuste conforme sua API

// Função para carregar dados do usuário e preencher os inputs
function carregarDados() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar usuário');
      return response.json();
    })
    .then(data => {
      document.getElementById('edit-name').value = data.name || '';
      document.getElementById('edit-email').value = data.email || '';
      // Nunca preencha senha real, deixe vazio ou outro comportamento
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

// Função para salvar dados editados
function salvarDados() {
  const updatedUser = {
    id: userId, // 👈 obrigatório
    name: document.getElementById('edit-name').value,
    email: document.getElementById('edit-email').value,
    address: document.getElementById('edit-address').value,
    phoneNumber: document.getElementById('edit-phone').value,
    genderText: document.getElementById('gender').value, // 👈 campo adicional
    // campos adicionais, se quiser enviar:
    password: document.getElementById('edit-password').value,
    photo: document.getElementById('edit-photo').value,
    cpf: document.getElementById('cpf').value,
    rg: document.getElementById('rg').value,
    birthday: document.getElementById('birthday').value,
  };

  fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
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

// Configura o evento do botão
document.getElementById('btn-save').addEventListener('click', salvarDados);

// Carrega os dados assim que a página abre
window.onload = carregarDados;