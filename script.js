document.addEventListener("DOMContentLoaded", () => {

  // ========================
  // VARIABLES
  // ========================

  let isAdmin = false;

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  const loginBtn = document.getElementById("login-btn");
  const modal = document.getElementById("login-modal");
  const submitLogin = document.getElementById("submit-login");
  const passwordInput = document.getElementById("password");

  const userName = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  const adminPanel = document.getElementById("admin-panel");

  const projectList = document.getElementById("project-list");

  const nameInput = document.getElementById("proj-name");
  const linkInput = document.getElementById("proj-link");

  const addBtn = document.getElementById("add-btn");

  // zone affichage projet
  const projTitle = document.getElementById("proj-title");
  const projDesc = document.getElementById("proj-desc");
  const projDate = document.getElementById("proj-date");
  const projAuthor = document.getElementById("proj-author");
  const openBtn = document.getElementById("open-project");

  const projectInfo = document.getElementById("project-info");
  const emptyState = document.getElementById("empty-state");


  // ========================
  // SAUVEGARDE
  // ========================

  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function updateProjects() {
    saveProjects();
    renderProjects();
  }


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

    passwordInput.value = "";
    modal.classList.add("hidden");
  });

  // ENTER login
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

    projects.push({
      name: name,
      link: link,
      description: "Aucune description",
      date: new Date().toLocaleDateString(),
      author: "Admin"
    });

    // vider form
    nameInput.value = "";
    linkInput.value = "";
    nameInput.focus();

    updateProjects();
  });


  // ========================
  // RENDER PROJETS
  // ========================

  function renderProjects() {
    projectList.innerHTML = "";

    projects.forEach((p, index) => {

      const li = document.createElement("li");
      li.className = "project-item";

      const name = document.createElement("span");
      name.textContent = p.name;

      // CLICK = afficher infos
      name.addEventListener("click", () => {

        projTitle.textContent = p.name;
        projDesc.textContent = p.description;
        projDate.textContent = p.date;
        projAuthor.textContent = p.author;

        projectInfo.classList.remove("hidden");
        emptyState.style.display = "none";

        openBtn.onclick = () => {
          window.open(p.link, "_blank");
        };

      });

      li.appendChild(name);

      // ========================
      // ACTIONS ADMIN
      // ========================

      if (isAdmin) {

        const actions = document.createElement("div");
        actions.className = "project-actions";

        //  MODIFIER
        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";

        editBtn.onclick = () => {
          const newName = prompt("Nom :", p.name);
          const newLink = prompt("Lien :", p.link);

          if (newName) p.name = newName;
          if (newLink) p.link = newLink;

          updateProjects();
        };

        // 🗑 SUPPRIMER
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";

        deleteBtn.onclick = () => {
          if (!confirm("Supprimer ?")) return;

          projects.splice(index, 1);
          updateProjects();
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(actions);
      }

      projectList.appendChild(li);
    });
  }


  // ========================
  // INIT
  // ========================

  renderProjects();

});
