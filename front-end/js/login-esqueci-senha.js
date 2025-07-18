document.getElementById("forgotModal").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  const res = await fetch("https://localhost:7082/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const msg = await res.text();
  document.getElementById("message").textContent = msg;
  then((data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', JSON.stringify(data.email));
    window.location.href = "index.html"
  })
});