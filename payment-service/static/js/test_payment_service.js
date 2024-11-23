const apiBaseUrl = "http://localhost:5002/api/payments"; // Cambiar si es necesario

// Función para crear una transacción
async function createTransaction() {
    const form = document.getElementById("createTransactionForm");
    const data = {
        buyer_id: form.buyerId.value,
        seller_id: form.sellerId.value,
        product_id: form.productId.value,
        total_amount: form.amount.value
    };

    try {
        const response = await fetch(`${apiBaseUrl}/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        document.getElementById("result").innerText = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error("Error al crear transacción:", error);
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}

// Función para obtener transacciones
async function getTransactions() {
    const form = document.getElementById("getTransactionsForm");
    const sellerId = form.sellerIdForTransactions.value;

    try {
        const response = await fetch(`${apiBaseUrl}/transactions?seller_id=${sellerId}`);
        const result = await response.json();
        document.getElementById("result").innerText = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error("Error al obtener transacciones:", error);
        document.getElementById("result").innerText = `Error: ${error.message}`;
    }
}
