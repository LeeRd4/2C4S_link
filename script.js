document.addEventListener("DOMContentLoaded", () => {

  // ========================
  // VARIABLES
  // ========================

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
  const projectFrame = document.getElementById("project-frame");
  const emptyState = document.getElementById("empty-state");

  const addBtn = document.getElementById("add-btn");
  const nameInput = document.getElementById("proj-name");
  const linkInput = document.getElementById("proj-link");


  // ========================
  // LOGIN
  // ========================

  loginBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  submitLogin.addEventListener("click", () => {
    const password = passwordInput.value;

    if (password === "1234") {
      isAdmin = true;

      userName.textContent = "Admin";
      logoutBtn.classList.remove("hidden");
      adminPanel.classList.remove("hidden");

    } else {
      isAdmin = false;

      userName.textContent = "Guest";
      logoutBtn.classList.add("hidden");
      adminPanel.classList.add("hidden");
    }

    modal.classList.add("hidden");
  });

  // ENTER = login
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      submitLogin.click();
    }
  });


  // ========================
  // LOGOUT
  // ========================

  logoutBtn.addEventListener("click", () => {
    isAdmin = false;

    userName.textContent = "Guest";
    logoutBtn.classList.add("hidden");
    adminPanel.classList.add("hidden");
  });


  // ========================
  // AJOUT PROJET
  // ========================

  addBtn.addEventListener("click", () => {

    if (!isAdmin) return;

    const name = nameInput.value.trim();
    const link = linkInput.value.trim();

    if (!name || !link) {
      alert("Remplis tous les champs");
      return;
    }

    projects.push({ name, link });

    // ✅ vider formulaire
    nameInput.value = "";
    linkInput.value = "";
    nameInput.focus();

    renderProjects();
  });


  // ========================
  // RENDER PROJETS
  // ========================

  function renderProjects() {
    projectList.innerHTML = "";

    projects.forEach((p, index) => {

      const li = document.createElement("li");
      li.className = "project-item";

      // NOM
      const name = document.createElement("span");
      name.textContent = p.name;

      name.addEventListener("click", () => {
        projectFrame.src = p.link;
        emptyState.style.display = "none";
      });

      li.appendChild(name);

      // ACTIONS ADMIN
      if (isAdmin) {

        const actions = document.createElement("div");
        actions.className = "project-actions";

        // ✏️ MODIFIER
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";

        editBtn.addEventListener("click", () => {
          const newName = prompt("Nouveau nom :", p.name);
          const newLink = prompt("Nouveau lien :", p.link);

          if (newName) p.name = newName;
          if (newLink) p.link = newLink;

          renderProjects();
        });

        // 🗑 SUPPRIMER
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";

        deleteBtn.addEventListener("click", () => {
          const confirmDelete = confirm("Supprimer ce projet ?");
          if (!confirmDelete) return;

          projects.splice(index, 1);
          renderProjects();
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
      }

      projectList.appendChild(li);
    });
  }


  // ========================
  // INITIALISATION
  // ========================

  // projet exemple (évite écran vide)
  projects.push({
    name: "Google",
    link: "https://www.google.com"
  });

  renderProjects();

});
