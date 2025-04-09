let tarefas = [];
let filtroAtual = 'todos';

function adicionarTarefa() {
  const inputTarefa = document.getElementById("inputTarefa");
  const mensagem = document.getElementById("mensagem");
  let textoTarefa = inputTarefa.value.trim();

  if (textoTarefa === "") {
    mensagem.textContent = "Digite uma tarefa para adicioná-la a sua lista!";
    return;
  }

  mensagem.textContent = "Tarefa adicionada com sucesso!";

  const novaTarefa = {
    texto: textoTarefa,
    status: 'pendente'
  };

  tarefas.push(novaTarefa);
  inputTarefa.value = "";
  renderizarTarefas();
}

function renderizarTarefas() {
  const listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.innerHTML = ""; 

  let tarefasParaExibir = tarefas;
  if (filtroAtual === 'pendentes') {
    tarefasParaExibir = tarefas.filter(tarefa => tarefa.status === 'pendente');
  } else if (filtroAtual === 'concluidos') {
    tarefasParaExibir = tarefas.filter(tarefa => tarefa.status === 'concluido');
  }

  tarefasParaExibir.forEach((tarefa, index) => {
    let li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.status === 'concluido') {
      li.classList.add("concluido");
    }

    li.addEventListener("click", () => {
      toggleStatusTarefa(index);
    });

    listaTarefas.appendChild(li);
  });
}

function toggleStatusTarefa(index) {
  tarefas[index].status = tarefas[index].status === 'pendente' ? 'concluido' : 'pendente';
  renderizarTarefas();
}

function atualizarFiltro(novoFiltro) {
  filtroAtual = novoFiltro;
  renderizarTarefas();
}

document.getElementById("filtrar-todos").addEventListener("click", () => atualizarFiltro("todos"));
document.getElementById("filtrar-pendentes").addEventListener("click", () => atualizarFiltro("pendentes"));
document.getElementById("filtrar-concluidos").addEventListener("click", () => atualizarFiltro("concluidos"));
