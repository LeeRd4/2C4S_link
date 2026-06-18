document.addEventListener("DOMContentLoaded", () => {

  let isAdmin = false;
  const projects = [];

  const loginBtn = document.getElementById("login-btn");
  const modal = document.getElementById("login-modal");
  const submitLogin = document.getElementById("submit-login");
  const passwordInput = document.getElementById("password");

  const userName = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  const adminPanel = document.getElementById("admin-panel");

  const projectList = document.getElementById("project-list");
  const frame = document.getElementById("project-frame");
  const emptyState = document.getElementById("empty-state");

  const addBtn = document.getElementById("add-btn");

  /* ===== LOGIN ===== */
  loginBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  submitLogin.addEventListener("click", () => {
    if (passwordInput.value === "13062013") {
      isAdmin = true;
      userName.textContent = "Admin";
      adminPanel.classList.remove("hidden");
      logoutBtn.classList.remove("hidden");
    } else {
      userName.textContent = "Guest";
    }
    modal.classList.add("hidden");
  });

  /* ===== LOGOUT ===== */
  logoutBtn.addEventListener("click", () => {
    isAdmin = false;
    userName.textContent = "Guest";
    adminPanel.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  });

  /* ===== AJOUT PROJET ===== */
  addBtn.addEventListener("click", () => {
  if (!isAdmin) return;

  const nameInput = document.getElementById("proj-name");
  const linkInput = document.getElementById("proj-link");

  const name = nameInput.value;
  const link = linkInput.value;

  if (!name || !link) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  projects.push({ name, link });

  // vider le formulaire
  nameInput.value = "";
  linkInput.value = "";

  renderProjects();
});

  /* ===== AFFICHAGE ===== */
  function renderProjects() {
  projectList.innerHTML = "";

  projects.forEach((p, index) => {

    const li = document.createElement("li");
    li.className = "project-item";

    // NOM
    const name = document.createElement("span");
    name.textContent = p.name;

    name.onclick = () => {
      projectFrame.src = p.link;
      emptyState.style.display = "none";
    };

    li.appendChild(name);

    // ACTIONS ADMIN
    if (isAdmin) {
      const actions = document.createElement("div");
      actions.className = "project-actions";

      // MODIFIER
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";

      editBtn.onclick = () => {
        const newName = prompt("Nouveau nom :", p.name);
        const newLink = prompt("Nouveau lien :", p.link);

        if (newName) p.name = newName;
        if (newLink) p.link = newLink;

        renderProjects();
      };

      // 🗑 SUPPRIMER
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑";

      deleteBtn.onclick = () => {
        const confirmDelete = confirm("Supprimer ce projet ?");
        if (!confirmDelete) return;

        projects.splice(index, 1);
        renderProjects();
      };

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.appendChild(actions);
    }

    projectList.appendChild(li);
  });
}

});
