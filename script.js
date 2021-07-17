const Modal = {
  open() {
    // Abrir Modal
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active') // Adicionar a class active ao modal
  },
  close() {
    // Fechar Modal
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active') // Remover a class active do modal
  }
}

const Transaction = {
  incomes() {
    // Somar todas as Entradas
  },
  expenses() {
    // Somar todas as saídas
  }
}