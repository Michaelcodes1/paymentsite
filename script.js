// Paystack Public Key (frontend safe)
const publicKey = "pk_test_1b7b7d62f93e88e631734634a7990c26e5ae755e";

// Attach click event to the Pay Now button
document.getElementById("payButton").addEventListener("click", payWithPaystack);

// Function to open Paystack payment popup
function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: publicKey,               // your public key
    email: "customer@example.com",// replace with user email or input later
    amount: 5000,                 // amount in kobo (₦50)
    currency: "NGN",
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // unique reference
    callback: function(response) {
      // Call backend to verify the payment
      fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: response.reference })
      })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Payment verified") {
          alert("Payment successful and verified!");
        } else {
          alert("Payment failed verification!");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error verifying payment");
      });
    },
    onClose: function() {
      alert("Transaction was not completed, window closed.");
    }
  });

  handler.openIframe(); // Opens the Paystack payment popup
}