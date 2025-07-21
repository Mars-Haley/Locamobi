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




//setLoading

//show toast
