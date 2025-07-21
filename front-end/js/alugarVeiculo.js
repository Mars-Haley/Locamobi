let vehicles = [];
let isLoading = false;

async function searchvehicle(){
    try{
        setLoading(true);   
        const data = await apiGetVeiculo('Veiculo')
        vehicles = data;
        renderTable();
    }catch(error){
        console.error('Erro ao buscar veículos', error);
        showToast('Erro','Não foi possível carregar a lista de veículos', 'error'),
        renderTable();
    }finally{
        setLoading(false);
    }
}

async function loadvehicle(){
    await searchvehicle();
    renderTable();
    renderSelect();
}

function renderSelect(){//renderizarSelect
    const vehiclesSelect = document.getElementById("vehicle-select-area");//criar no html vehicle-select-area
    const options = vehicles.data.map(veh => {
        return `<option value="${veh.id}"> ${veh.nome} </option>`   
    })
                                    //ver vehicle-selct qual é a sua função
    vehiclesSelect.innerHTML = `<select id="vehicle-select">
        ${options.join('')}
    </select>`;
}

function renderTableVehicle(){//renderizarTabelasDeVeiculos
    const tbody = document.getElementById('vehicles-tbody');//Criar t-body no html
    const emptyState = document.getElementById('empty-state');// criar empty-state
    const tableContainer = document.getElementById('table-container');//criar table-container

    if(vehicles.lenght === 0){
        tableContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    tableContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    //criar html para ser alterado pelo javascript
    tbody.innerHTML = vehicles.data.map(vehicles => `
    
    
    
    `).join('');
}

function setLoading(loading){
    isLoading = loading;
    const loadingElem = getElementById('loading'); // criar index loading
    const tableContainer = getElementById('table-container');//criar table-container

    if(loading){
        loadingElem.classList.remove('hidden');
        tableContainer.classList.add('hidden');
    }else{
        loadingElem.classList.add('hidden');
        if(vehicles.length > 0){
            tableContainer.classList.remove('hidden');
        }
    }
}


// Sistema de Toast
function showToast(title, message, type = 'info') {
    const toast = document.getElementById('toast'); // criar toast
    const toastIcon = document.getElementById('toast-icon'); //criar toast-icon
    const toastTitle = document.getElementById('toast-title'); //criar toast-tittle
    const toastMessage = document.getElementById('toast-message'); //criar toast-message

    // Configurar ícone e cores baseado no tipo
    let iconName = 'info';
    let iconColor = 'text-blue-500';//colocar cor padrao locamobi

    switch (type) {
        case 'success':
            iconName = 'check-circle';
            iconColor = 'text-green-500';
            break;
        case 'error':
            iconName = 'x-circle';
            iconColor = 'text-red-500';
            break;
        case 'warning':
            iconName = 'alert-triangle';
            iconColor = 'text-yellow-500';
            break;
    }

    toastIcon.setAttribute('data-lucide', iconName);
    toastIcon.className = `h-5 w-5 ${iconColor}`;
    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.remove('hidden');
    lucide.createIcons();

    // Auto-hide após 5 segundos
    setTimeout(() => {
        hideToast();
    }, 5000);
}

