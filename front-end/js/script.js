// Global variables
let currentStep = 1
const totalSteps = 5
let uploadedFiles = []

// Vehicle data (moved from HTML)
const vehicles = [
  {
    id: 1,
    name: "Renault Kwid",
    category: "Econômico",
    price: "R$ 85,00 - R$ 110,00",
    rating: 5,
    image: "images/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Fiat Argo",
    category: "Econômico",
    price: "R$ 98,00 - R$ 120,00",
    rating: 5,
    image: "images/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Chevrolet Onix",
    category: "Econômico",
    price: "R$ 100,00 - R$ 125,00",
    rating: 5,
    image: "images/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Ford Ka",
    category: "Econômico",
    price: "R$ 92,00 - R$ 117,00",
    rating: 5,
    image: "images/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Hyundai HB20",
    category: "Econômico",
    price: "R$ 98,00 - R$ 120,00",
    rating: 5,
    image: "images/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Volkswagen Gol",
    category: "Econômico",
    price: "R$ 90,00 - R$ 115,00",
    rating: 5,
    image: "images/placeholder.svg?height=200&width=300",
  },
]

// Function to load pages dynamically
async function loadPage(pageName, activeNavId = null) {
  const mainContent = document.getElementById("main-content")
  try {
    const response = await fetch(pageName)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const html = await response.text()
    mainContent.innerHTML = html

    // Re-initialize page-specific scripts after content is loaded
    if (pageName === "rent-vehicle.html") {
      populateVehicleGrid()
    } else if (pageName === "register-vehicle.html") {
      currentStep = 1 // Reset step for registration form
      updateStepIndicators()
      initializeRegistrationFormListeners()
    }

    updateNavigation(activeNavId)
  } catch (error) {
    console.error("Failed to load page:", error)
    mainContent.innerHTML =
      '<div class="container mx-auto px-4 py-16 text-center text-red-600">Erro ao carregar a página. Por favor, tente novamente.</div>'
  }
}

function updateNavigation(activeId) {
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("text-primary-orange")
    link.classList.add("text-gray-600")
  })
  if (activeId) {
    const activeLink = document.getElementById(activeId)
    if (activeLink) {
      activeLink.classList.remove("text-gray-600")
      activeLink.classList.add("text-primary-orange")
    }
  }
}

function showLogin() {
  document.getElementById("loginModal").classList.remove("hidden")
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.add("hidden")
}

// Vehicle grid population (called after rent-vehicle.html is loaded)
function populateVehicleGrid() {
  const grid = document.getElementById("vehicleGrid")
  if (!grid) return // Ensure grid exists before populating
  grid.innerHTML = ""

  vehicles.forEach((vehicle) => {
    const card = document.createElement("div")
    card.className = "bg-white rounded-2xl shadow-soft overflow-hidden card-hover"
    card.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="font-bold text-gray-800">${vehicle.name}</h3>
                    <div class="flex text-yellow-400">
                        ${"★".repeat(vehicle.rating)}
                    </div>
                </div>
                <p class="text-sm text-gray-600 mb-2">${vehicle.category}</p>
                <p class="font-bold text-gray-800 mb-4">${vehicle.price}</p>
                <div class="flex space-x-2">
                    <button onclick="viewDetails(${vehicle.id})" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors">
                        Ver detalhes →
                    </button>
                    <button onclick="rentNow(${vehicle.id})" class="flex-1 btn-primary text-white py-2 px-4 rounded-lg font-medium">
                        Alugar Agora
                    </button>
                </div>
            </div>
        `
    grid.appendChild(card)
  })
}

function viewDetails(vehicleId) {
  alert(`Visualizando detalhes do veículo ID: ${vehicleId}`)
}

function rentNow(vehicleId) {
  alert(`Iniciando processo de aluguel do veículo ID: ${vehicleId}`)
}

// Multi-step form functions (called after register-vehicle.html is loaded)
function initializeRegistrationFormListeners() {
  // Re-attach event listeners for the current step's buttons
  const currentStepElement = document.getElementById(`step${currentStep}`)
  if (currentStepElement) {
    const nextButton = currentStepElement.querySelector('[onclick="nextStep()"]')
    if (nextButton) nextButton.onclick = nextStep
    const prevButton = currentStepElement.querySelector('[onclick="prevStep()"]')
    if (prevButton) prevButton.onclick = prevStep
    const submitButton = currentStepElement.querySelector('[onclick="submitVehicle()"]')
    if (submitButton) submitButton.onclick = submitVehicle
  }

  // Re-initialize file upload functionality for step 4
  if (currentStep === 4) {
    setupFileUpload()
  }
}

function nextStep() {
  if (currentStep < totalSteps) {
    if (validateStep(currentStep)) {
      document.getElementById(`step${currentStep}`).classList.add("hidden")
      currentStep++
      document.getElementById(`step${currentStep}`).classList.remove("hidden")
      updateStepIndicators()
      initializeRegistrationFormListeners() // Re-initialize listeners for the new step
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    document.getElementById(`step${currentStep}`).classList.add("hidden")
    currentStep--
    document.getElementById(`step${currentStep}`).classList.remove("hidden")
    updateStepIndicators()
    initializeRegistrationFormListeners() // Re-initialize listeners for the new step
  }
}

function updateStepIndicators() {
  for (let i = 1; i <= totalSteps; i++) {
    const indicator = document.getElementById(`step${i}-indicator`)
    if (indicator) {
      if (i <= currentStep) {
        indicator.classList.add("active")
        indicator.classList.remove("bg-gray-300")
      } else {
        indicator.classList.remove("active")
        indicator.classList.add("bg-gray-300")
      }
    }
  }
}

function validateStep(step) {
  switch (step) {
    case 1:
      const privacy = document.getElementById("privacy")?.checked
      const terms = document.getElementById("terms")?.checked
      if (!privacy || !terms) {
        alert("Por favor, aceite todos os termos e condições para continuar.")
        return false
      }
      break
    case 4:
      if (uploadedFiles.length < 3) {
        alert("Por favor, envie pelo menos 3 fotos do veículo.")
        return false
      }
      break
    // Add more validation for other steps as needed
  }
  return true
}

function submitVehicle() {
  if (validateStep(currentStep)) {
    document.getElementById("successModal").classList.remove("hidden")
  }
}

function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden")
  loadPage("home.html", "nav-home") // Go back to home after success
  currentStep = 1 // Reset step
  uploadedFiles = [] // Clear uploaded files
}

// File upload functionality (called after register-vehicle.html is loaded and step 4 is active)
function setupFileUpload() {
  const dropZone = document.getElementById("dropZone")
  const fileInput = document.getElementById("fileInput")
  const uploadButton = dropZone?.querySelector("button")
  const uploadedFilesContainer = document.getElementById("uploadedFiles")

  // Clear previous files and container content
  uploadedFiles = []
  if (uploadedFilesContainer) uploadedFilesContainer.innerHTML = ""

  if (uploadButton) {
    uploadButton.onclick = (e) => {
      e.preventDefault()
      fileInput.click()
    }
  }

  if (fileInput) {
    fileInput.onchange = handleFiles
  }

  if (dropZone) {
    dropZone.ondragover = (e) => {
      e.preventDefault()
      dropZone.classList.add("border-primary-orange", "bg-orange-50")
    }

    dropZone.ondragleave = (e) => {
      e.preventDefault()
      dropZone.classList.remove("border-primary-orange", "bg-orange-50")
    }

    dropZone.ondrop = (e) => {
      e.preventDefault()
      dropZone.classList.remove("border-primary-orange", "bg-orange-50")
      const files = e.dataTransfer.files
      handleFiles({ target: { files } })
    }
  }
}

function handleFiles(event) {
  const files = Array.from(event.target.files)
  const uploadedFilesContainer = document.getElementById("uploadedFiles")

  files.forEach((file) => {
    if (file.size > 20 * 1024 * 1024) {
      alert(`Arquivo ${file.name} é muito grande. Máximo 20MB.`)
      return
    }

    if (!["image/jpeg", "image/jpg", "image/png", "image/heic"].includes(file.type)) {
      alert(`Arquivo ${file.name} não é um formato válido.`)
      return
    }

    uploadedFiles.push(file)

    const fileElement = document.createElement("div")
    fileElement.className = "flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
    fileElement.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-image text-gray-400 mr-3"></i>
                <span class="text-sm text-gray-700">${file.name}</span>
            </div>
            <button type="button" onclick="removeFile('${file.name}')" class="text-red-500 hover:text-red-700">
                <i class="fas fa-times"></i>
            </button>
        `
    uploadedFilesContainer.appendChild(fileElement)
  })
}

function removeFile(fileName) {
  uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName)
  const uploadedFilesContainer = document.getElementById("uploadedFiles")
  if (uploadedFilesContainer) {
    uploadedFilesContainer.innerHTML = "" // Clear and re-render
    uploadedFiles.forEach((file) => {
      const fileElement = document.createElement("div")
      fileElement.className = "flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
      fileElement.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-image text-gray-400 mr-3"></i>
                    <span class="text-sm text-gray-700">${file.name}</span>
                </div>
                <button type="button" onclick="removeFile('${file.name}')" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                </button>
            `
      uploadedFilesContainer.appendChild(fileElement)
    })
  }
}

// Initial page load
document.addEventListener("DOMContentLoaded", () => {
  loadPage("home.html", "nav-home")
})
