// Paystack Public Key (frontend safe)
const publicKey = "pk_live_39cf8f7f84e6e7c2a923f84b55885e42ee163edf";

// Attach click event to the Pay Now button
document.getElementById("payButton").addEventListener("click", payWithPaystack);

// Function to open Paystack payment popup
function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: publicKey,               // your public key
    email: "orokoandco@gmail.com",// replace with user email or input later
    amount: 120000,                 // amount in kobo (₦50)
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
