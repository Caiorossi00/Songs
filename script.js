let songs = [];
let dificuldades = {
  "★": [],
  "★★": [],
  "★★★": [],
  "★★★★": [],
  "★★★★★": [],
};

function carregarDados() {
  const dadosSalvos = localStorage.getItem("dadosMusicas");
  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    songs = dados.songs || [];
    dificuldades = dados.dificuldades || dificuldades;
    exibirMusicas();
  }
}

carregarDados();

function adicionarMusica() {
  const songName = document.getElementById("songName").value;
  const songDificulty = document.getElementById("songDificulty").value;

  if (songName.trim() !== "") {
    const novaMusica = {
      nome: songName,
      dificuldade: songDificulty,
    };

    songs.push(novaMusica);
    classificarDificuldade(novaMusica);
    limparFormulario();
    salvarDados();
  } else {
    alert("Por favor, insira o nome da música.");
  }

  exibirMusicas();

  console.log(dificuldades);
}

function classificarDificuldade(musica) {
  const { nome, dificuldade } = musica;
  dificuldades[dificuldade].push({ nome, dificuldade });
}

function limparFormulario() {
  document.getElementById("addSongForm").reset();
}

function exibirMusicas() {
  const listaMusicasDiv = document.getElementById("listaMusicas");
  listaMusicasDiv.innerHTML = "";

  for (const [dificuldade, musicas] of Object.entries(dificuldades)) {
    for (let i = 0; i < musicas.length; i++) {
      const infoMusica = document.createElement("p");
      infoMusica.textContent = `${musicas[i].dificuldade} ${musicas[i].nome} `;

      const botaoExcluir = document.createElement("button");
      botaoExcluir.textContent = "x";
      botaoExcluir.onclick = () => excluirMusica(dificuldade, i);

      botaoExcluir.classList.add("btn-excluir");

      infoMusica.appendChild(botaoExcluir);
      listaMusicasDiv.appendChild(infoMusica);
    }
  }

  salvarDados();
}

function excluirMusica(dificuldade, indice) {
  dificuldades[dificuldade].splice(indice, 1);
  exibirMusicas();
}

function salvarDados() {
  const dados = { songs, dificuldades };
  localStorage.setItem("dadosMusicas", JSON.stringify(dados));
}
