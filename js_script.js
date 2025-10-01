// Curtir um post
function like(btn) {
  const span = btn.parentElement.querySelector('span');
  let count = parseInt(span.textContent) || 0;
  count++;
  span.textContent = count + " curtidas";
  btn.style.color = "red"; // muda a cor do coração ao curtir
}

// Abrir / fechar seção de comentários
function toggleComment(id) {
  const commentBox = document.getElementById(id);
  if(commentBox.style.display === "block") {
    commentBox.style.display = "none";
  } else {
    commentBox.style.display = "block";
  }
}

// Enviar comentário
function sendComment(postId) {
  const commentBox = document.getElementById(postId);
  const input = commentBox.querySelector('input');
  const val = input.value.trim();
  if(!val) return;
  
  const div = document.createElement('div');
  div.textContent = "Você: " + val;
  div.style.padding = "4px 0";
  div.style.fontSize = "0.9rem";
  commentBox.insertBefore(div, input);
  
  input.value = "";
}

// Abrir story em modal
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