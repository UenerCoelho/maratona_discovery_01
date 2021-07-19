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

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
  },
  {
    id: 2,
    description: 'WebSite',
    amount: 500000,
    date: '23/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
  },
  {
    id: 4,
    description: 'App',
    amount: 200000,
    date: '23/01/2021',
  },
]
/*
    Eu preciso somar as entradas
    depois  eu preciso somar as saidas e
    remover das entradas o valor das saidas
    assim, eu terei o total
*/

const Transaction = {
  incomes() {
    return 'IncomesDisplay'
  },
  expenses() {
    return 'expensesDisplay'
  },
  total() {
    return 'totalDisplay'
  }
}

/*
    Eu preciso os dados do HTML com os dados do JS
 */

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
          <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover Transação"></td>
          </tr>
          `

    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Transaction.incomes()
    document
      .getElementById('expenseDisplay')
      .innerHTML = Transaction.expenses()
    document
      .getElementById('totalDisplay')
      .innerHTML = Transaction.total()
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()