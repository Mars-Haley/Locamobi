document.getElementById("resetForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const token = document.getElementById("token").value;
    const newPassword = document.getElementById("novaSenha").value;
  
    const res = await fetch("https://localhost:7082/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword })
    });
  
    const msg = await res.text();
    document.getElementById("message").textContent = msg;
  });