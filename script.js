// Update players online counter with animation
function updatePlayersOnline() {
  const element = document.getElementById("players-online")
  if (!element) return

  const target = Math.floor(Math.random() * 50) + 220
  const current = Number.parseInt(element.textContent)
  const increment = target > current ? 1 : -1
  const duration = 2000
  const steps = Math.abs(target - current)
  const stepTime = duration / steps

  let counter = current
  const timer = setInterval(() => {
    counter += increment
    element.textContent = counter
    if (counter === target) {
      clearInterval(timer)
    }
  }, stepTime)
}

// Copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("IP copiado para a área de transferência!")
    })
    .catch((err) => {
      console.error("Erro ao copiar:", err)
    })
}

// Store category filter
function setupStoreCategories() {
  const categoryButtons = document.querySelectorAll(".category-btn")
  const products = document.querySelectorAll(".product-card")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter products
      products.forEach((product) => {
        if (product.dataset.category === category) {
          product.style.display = "block"
        } else {
          product.style.display = "none"
        }
      })
    })
  })
}

// Buy product function
function buyProduct(productName, price) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true"

  if (!isLoggedIn) {
    alert("Você precisa estar logado para fazer compras!")
    window.location.href = "login.html"
    return
  }

  const priceFormatted = typeof price === "number" ? `R$ ${price.toFixed(2)}` : price

  localStorage.setItem("orderProduct", productName)
  localStorage.setItem("orderPrice", priceFormatted)

  window.location.href = "pagamento.html"
}

// Login form handler
function setupLoginForm() {
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      // Simple validation (in production, this would be server-side)
      if (username && password) {
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("username", username)
        alert("Login realizado com sucesso!")
        window.location.href = "dashboard.html"
      } else {
        alert("Por favor, preencha todos os campos.")
      }
    })
  }
}

// Logout function
function logout() {
  const confirm = window.confirm("Deseja realmente sair?")
  if (confirm) {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("username")
    window.location.href = "index.html"
  }
}

// Check if user is logged in (for dashboard page)
function checkAuth() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true"
  const isDashboard = window.location.pathname.includes("dashboard.html")

  if (isDashboard && !isLoggedIn) {
    alert("Você precisa estar logado para acessar esta página!")
    window.location.href = "login.html"
  }

  // Update player name on dashboard
  const playerNameElement = document.getElementById("playerName")
  if (playerNameElement && isLoggedIn) {
    const username = localStorage.getItem("username")
    if (username) {
      playerNameElement.textContent = username.replace("_", " ")
    }
  }
}

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  }
}

// Copy PIX code function
function copyPixCode() {
  const pixCodeInput = document.getElementById("pixCode")
  if (pixCodeInput) {
    pixCodeInput.select()
    navigator.clipboard
      .writeText(pixCodeInput.value)
      .then(() => {
        alert("Código PIX copiado para a área de transferência!")
      })
      .catch((err) => {
        console.error("Erro ao copiar:", err)
      })
  }
}

// Setup payment page
function setupPaymentPage() {
  const confirmButton = document.querySelector(".btn-confirm-payment")

  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      const qrPlaceholder = document.querySelector(".qr-placeholder")
      if (qrPlaceholder) {
        // Simulate QR code generation
        qrPlaceholder.innerHTML = `
          <div style="font-size: 5rem; margin-bottom: 1rem;">📱</div>
          <p style="color: var(--success); font-weight: 600;">QR Code gerado com sucesso!</p>
          <p style="font-size: 0.85rem;">Escaneie para pagar</p>
        `

        // Update button
        confirmButton.textContent = "Aguardando Pagamento..."
        confirmButton.style.background = "var(--warning)"
        confirmButton.disabled = true

        alert("QR Code PIX gerado! Escaneie com o app do seu banco ou copie o código acima.")
      }
    })
  }

  // Load order from localStorage if exists
  const orderProduct = localStorage.getItem("orderProduct")
  const orderPrice = localStorage.getItem("orderPrice")

  if (orderProduct && orderPrice) {
    const orderProductElement = document.getElementById("orderProduct")
    const orderPriceElement = document.getElementById("orderPrice")
    const totalPriceElement = document.getElementById("totalPrice")

    if (orderProductElement) orderProductElement.textContent = orderProduct
    if (orderPriceElement) orderPriceElement.textContent = orderPrice
    if (totalPriceElement) totalPriceElement.textContent = orderPrice
  }
}

// Initialize all features
document.addEventListener("DOMContentLoaded", () => {
  updatePlayersOnline()
  setupStoreCategories()
  setupLoginForm()
  checkAuth()
  setupMobileMenu()
  setupPaymentPage()

  // Update players online every 30 seconds
  setInterval(updatePlayersOnline, 30000)
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})
