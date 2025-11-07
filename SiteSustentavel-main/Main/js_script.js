/*  JS SCRIPT NE DUUR  */

function registrarUsuario(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const usuario = { nome, email, senha };
  localStorage.setItem('usuario', JSON.stringify(usuario));
  alert("Cadastro concluído com sucesso!");
  window.location.href = "/Pages/login.html";
}

function loginUsuario(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

  if (usuarioSalvo && email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
    localStorage.setItem('logado', 'true');
    alert("Login bem-sucedido!");
    window.location.href = "/Pages/feed.html";
  } else {
    alert("E-mail ou senha incorretos.");
  }
}

function sair() {
  localStorage.removeItem('logado');
  window.location.href = "/Pages/login.html";
}

function criarPost(event) {
  event.preventDefault();

  const fileInput = document.getElementById('foto');
  const descricao = document.getElementById('descricao').value.trim();

  if (!fileInput.files[0]) {
    alert('Escolha uma imagem para postar.');
    return false;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const novoPost = {
      id: Date.now(),
      imagem: e.target.result,
      descricao: descricao,
      usuario: 'susty_user'
    };
    posts.push(novoPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    alert('Post publicado com sucesso! 🌿');
    window.location.href = '/Pages/feed.html';
  };
  reader.readAsDataURL(fileInput.files[0]);
  return false;
}

function like(btn) {
  const span = btn.parentElement.querySelector('span');
  let count = parseInt(span.textContent) || 0;
  count++;
  span.textContent = count + " curtidas";
  btn.style.color = "red";
}

function toggleComment(id) {
  const commentBox = document.getElementById(id);
  commentBox.style.display = commentBox.style.display === "block" ? "none" : "block";
}

function sendComment(postId) {
  const commentBox = document.getElementById(postId);
  const input = commentBox.querySelector('input');
  const val = input.value.trim();
  if (!val) return;

  const div = document.createElement('div');
  div.textContent = "Você: " + val;
  div.style.padding = "4px 0";
  div.style.fontSize = "0.9rem";
  commentBox.insertBefore(div, input);
  input.value = "";
}

function openStory(src, name) {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.right = 0;
  modal.style.bottom = 0;
  modal.style.background = 'rgba(0,0,0,0.6)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = 9999;

  modal.innerHTML = `
    <div style="background:white; padding:16px; border-radius:12px; text-align:center; max-width:90%; max-height:90%; overflow:auto;">
      <img src="${src}" alt="${name}" style="width:200px; border-radius:12px; display:block; margin:0 auto 12px;">
      <p style="font-weight:600; margin-bottom:12px;">${name}</p>
      <button onclick="this.parentElement.parentElement.remove()" style="padding:8px 16px; border:none; border-radius:8px; background:#2e7d32; color:white; cursor:pointer;">Fechar</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function inicializarFeed() {
  carregarStories();
  carregarFeed();
}

function carregarStories() {
  const stories = JSON.parse(localStorage.getItem('stories')) || [
    { nome: '@eco_maria', imagem: '/Images/story1.jpg' },
    { nome: '@verde_joao', imagem: '/Images/story2.jpg' }
  ];
  const container = document.getElementById('storiesContainer');
  if (!container) return;

  container.innerHTML = '';
  stories.forEach(story => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `
      <img src="${story.imagem}" alt="${story.nome}" onclick="openStory('${story.imagem}', '${story.nome}')">
      <p>${story.nome}</p>
    `;
    container.appendChild(div);
  });
}

function carregarFeed() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const container = document.getElementById('feedContainer');
  if (!container) return;

  container.innerHTML = '';
  if (posts.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#777;">Nenhum post ainda 🌱</p>';
    return;
  }

  posts.reverse().forEach((p) => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <div class="post-header">
        <img src="/Images/user.jpg" alt="Usuário">
        <strong>@${p.usuario || 'susty_user'}</strong>
      </div>
      <img src="${p.imagem}" alt="Post">
      <div class="caption">${p.descricao}</div>
      <div class="post-actions">
        <button onclick="like(this)">❤️</button>
        <span>0 curtidas</span>
        <button onclick="toggleComment('c${p.id}')">💬</button>
      </div>
      <div id="c${p.id}" style="display:none; padding:10px;">
        <input type="text" placeholder="Comente algo..." style="width:100%; border-radius:10px; border:1px solid #ccc; padding:6px;">
        <button onclick="sendComment('c${p.id}')" class="btn" style="margin-top:6px;">Enviar</button>
      </div>
    `;
    container.appendChild(postDiv);
  });
}

function carregarPerfil() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) return;
  const nome = document.getElementById('perfilNome');
  const email = document.getElementById('perfilEmail');
  if (nome) nome.textContent = usuario.nome;
  if (email) email.textContent = usuario.email;
}

function recuperarSenha(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario && email === usuario.email) {
    alert("Um link de recuperação foi enviado para seu e-mail!");
  } else {
    alert("E-mail não encontrado.");
  }
}

function carregarExplorar() {
  const container = document.getElementById('explorarContainer');
  if (!container) return;
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  container.innerHTML = "";
  posts.slice(0, 6).forEach(post => {
    const img = document.createElement('img');
    img.src = post.imagem;
    img.alt = post.descricao;
    img.classList.add('explorar-img');
    container.appendChild(img);
  });
  if (posts.length === 0) {
    container.innerHTML = "<p>Nenhuma imagem disponível 🌎</p>";
  }
}

function carregarReels() {
  const container = document.getElementById('reelsContainer');
  if (!container) return;
  container.innerHTML = `
    <video controls width="100%" style="border-radius:12px;">
      <source src="/Assets/sample_reel.mp4" type="video/mp4">
      Seu navegador não suporta vídeo.
    </video>
  `;
}

function adicionarStory(imagem, nome = '@voce') {
  const stories = JSON.parse(localStorage.getItem('stories')) || [];
  const novoStory = { imagem, nome };
  stories.push(novoStory);
  localStorage.setItem('stories', JSON.stringify(stories));
}

function carregarStoriesSalvos() {
  const stories = JSON.parse(localStorage.getItem('stories')) || [];
  const container = document.getElementById('storiesContainer');
  if (!container) return;
  stories.forEach(story => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `
      <img src="${story.imagem}" alt="${story.nome}" onclick="openStory('${story.imagem}', '${story.nome}')">
      <p>${story.nome}</p>
    `;
    container.appendChild(div);
  });
}
