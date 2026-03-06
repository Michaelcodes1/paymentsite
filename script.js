// Paystack Public Key (your key)
const publicKey = "pk_test_1b7b7d62f93e88e631734634a7990c26e5ae755e";

// Attach click event to button
document.getElementById("payButton").addEventListener("click", payWithPaystack);

function payWithPaystack() {
  let handler = PaystackPop.setup({
    key: publicKey, // your public key
    email: "customer@example.com", // replace with user email or input later
    amount: 5000, // amount in kobo (₦50)
    currency: "NGN",
    ref: "" + Math.floor(Math.random() * 1000000000 + 1), // unique reference
    callback: function(response) {
      alert("Payment successful. Reference: " + response.reference);
    },
    onClose: function() {
      alert("Transaction was not completed, window closed.");
    }
  });

  handler.openIframe();
}