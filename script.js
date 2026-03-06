function testBackend() {
  alert("Button clicked");

  fetch("/.netlify/functions/hello")
    .then(res => res.json())
    .then(data => {
      alert(data.message);
    })
    .catch(err => {
      alert("Error connecting to backend");
      console.log(err);
    });
}