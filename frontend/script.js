const API_URL = "/api/expenses";

const expenseForm = document.getElementById("expenseForm");
const expenseIdInput = document.getElementById("expenseId");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const expenseTableBody = document.getElementById("expenseTableBody");
const totalAmountElement = document.getElementById("totalAmount");
const messageBox = document.getElementById("messageBox");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const refreshButton = document.getElementById("refreshButton");

const showMessage = (message, type = "success") => {
  messageBox.textContent = message;
  messageBox.className = `message-box ${type}`;

  setTimeout(() => {
    messageBox.textContent = "";
    messageBox.className = "message-box";
  }, 3000);
};

const resetForm = () => {
  expenseForm.reset();
  expenseIdInput.value = "";
  formTitle.textContent = "Add New Expense";
  submitButton.textContent = "Add Expense";
  cancelButton.classList.add("hidden");
  dateInput.value = new Date().toISOString().split("T")[0];
};

const formatDate = (dateValue) => {
  return new Date(dateValue).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const formatCurrency = (amount) => {
  return `Rs. ${Number(amount).toFixed(2)}`;
};

const renderExpenses = (expenses, totalAmount) => {
  if (!expenses.length) {
    expenseTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No expenses found. Add your first expense.</td>
      </tr>
    `;
  } else {
    expenseTableBody.innerHTML = expenses
      .map(
        (expense) => `
          <tr>
            <td>${expense.description}</td>
            <td>${formatCurrency(expense.amount)}</td>
            <td>${expense.category}</td>
            <td>${formatDate(expense.date)}</td>
            <td>
              <div class="action-buttons">
                <button
                  class="edit-btn"
                  data-id="${expense._id}"
                  data-description="${expense.description}"
                  data-amount="${expense.amount}"
                  data-category="${expense.category}"
                  data-date="${new Date(expense.date).toISOString().split("T")[0]}"
                >
                  Edit
                </button>
                <button class="delete-btn" data-id="${expense._id}">Delete</button>
              </div>
            </td>
          </tr>
        `
      )
      .join("");
  }

  totalAmountElement.textContent = formatCurrency(totalAmount);
};

const fetchExpenses = async () => {
  try {
    expenseTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">Loading expenses...</td>
      </tr>
    `;

    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to load expenses.");
    }

    renderExpenses(data.expenses, data.totalAmount);
  } catch (error) {
    expenseTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">${error.message}</td>
      </tr>
    `;
    showMessage(error.message, "error");
  }
};

const createExpense = async (expenseData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expenseData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to add expense.");
  }

  return data;
};

const updateExpense = async (expenseId, expenseData) => {
  const response = await fetch(`${API_URL}/${expenseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expenseData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to update expense.");
  }

  return data;
};

const deleteExpense = async (expenseId) => {
  const response = await fetch(`${API_URL}/${expenseId}`, {
    method: "DELETE"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to delete expense.");
  }

  return data;
};

expenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const expenseData = {
    description: descriptionInput.value.trim(),
    amount: Number(amountInput.value),
    category: categoryInput.value.trim(),
    date: dateInput.value
  };

  try {
    if (expenseIdInput.value) {
      await updateExpense(expenseIdInput.value, expenseData);
      showMessage("Expense updated successfully.");
    } else {
      await createExpense(expenseData);
      showMessage("Expense added successfully.");
    }

    resetForm();
    fetchExpenses();
  } catch (error) {
    showMessage(error.message, "error");
  }
});

expenseTableBody.addEventListener("click", async (event) => {
  const target = event.target;
  const expenseId = target.dataset.id;

  if (target.classList.contains("edit-btn")) {
    try {
      expenseIdInput.value = expenseId;
      descriptionInput.value = target.dataset.description;
      amountInput.value = Number(target.dataset.amount);
      categoryInput.value = target.dataset.category;
      dateInput.value = target.dataset.date;

      formTitle.textContent = "Edit Expense";
      submitButton.textContent = "Update Expense";
      cancelButton.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      showMessage("Unable to load expense data for editing.", "error");
    }
  }

  if (target.classList.contains("delete-btn")) {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteExpense(expenseId);
      showMessage("Expense deleted successfully.");

      if (expenseIdInput.value === expenseId) {
        resetForm();
      }

      fetchExpenses();
    } catch (error) {
      showMessage(error.message, "error");
    }
  }
});

cancelButton.addEventListener("click", resetForm);
refreshButton.addEventListener("click", fetchExpenses);

resetForm();
fetchExpenses();
