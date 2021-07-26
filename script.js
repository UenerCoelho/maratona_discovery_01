// Função Responsável pelo abre e fecha do Modal
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

// Variável das transações
const transactions = [
  {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
  },
  {
    description: 'WebSite',
    amount: 500000,
    date: '23/01/2021',
  },
  {
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
  },
  {
    description: 'App',
    amount: 200000,
    date: '23/01/2021',
  },
]

/* ## Lógica da soma dos valores
        * Eu preciso somar as entradas
        * Depois  eu preciso somar as saídas e
        * Remover das entradas o valor das saídas
            - assim, eu terei o total
*/
// Realização soma e subtração dos valores
const Transaction = {
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  // Remove itens da Table
  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  // Soma as Entradas
  incomes() {
    let income = 0;
    // Pegar todas as transações
    // Para cada transação,
    Transaction.all.forEach(transaction => {
      // se for maior que zero
      if (transaction.amount > 0) {
        // Somar a um variável
        income += transaction.amount;
      }
    })
    // retornar a variável
    return income;
  },

  // Somas as Saídas
  expenses() {
    let expense = 0;
    // Pegar todas as transações
    // para cada transação,
    Transaction.all.forEach(transaction => {
      // se for menor que zero
      if (transaction.amount < 0) {
        // somar a uma variável e retornar a variável
        expense += transaction.amount;
      }
    })
    return expense;
  },

  // Soma o total de entradas e subtrai as saídas
  total() {
    return Transaction.incomes() + Transaction.expenses();
  }
}

// Edição da Table
const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)

  },
  // Onde o Usuário vai preencher a table, pelo browser
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
              <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
            </td>
          `

    return html
  },

  // Responsável por apresentar a formatação do Números na tela
  updateBalance() {
    document // Entradas
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document // Saídas
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document // Total
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

// Formatação dos sinais nos valores
const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, "")) * 100

    return value
  },

  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : " "

    value = String(value).replace(/\D/g, " ")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL" // Transforma em Real Ex.: R$ 2,00
    })

    return signal + value
  },
}

// Variável que para capturar os dados novo para colocar na Table
const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  // Pega os dados dos campos
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  // Captura os dados dos campos
  // Verificar se todas as informações foram preenchidas (validateField)
  validateField() {
    const { description, amount, date } = Form.getValues()

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "") {
      throw new Error("Por favor, preencha todos os campos")
    }
  },

  // formatar os dados para salvar
  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    // console.log(amount, date)

    return {
      description,
      amount,
      date
    }
  },

  // salvar e Atualizar, após salvar 
  saveTransaction(transaction) {
    Transaction.add(transaction)
  },

  // apagar os dados do formulário, após salvar
  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    event.preventDefault()

    try {
      // Verificar se todas as informações foram preenchidas (validateField)
      Form.validateField()
      // formatar os dados para salvar
      const transaction = Form.formatValues()
      // salvar e Atualizar, após salvar 
      Form.saveTransaction(transaction)
      // apagar os dados do formulário, após salvar
      Form.clearFields()
      // fechar o modal após salvar
      Modal.close()
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    // Transaction.all.forEach((transaction, index) => {
    //   DOM.addTransaction(transaction, index)
    // })
    Transaction.all.forEach(DOM.addTransaction)

    DOM.updateBalance()
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()
