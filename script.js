let currentStep = 1;
const selections = {
  step1: [],
  step2: [],
  step3: []
};

function showStep(step) {
  document.querySelectorAll(".step").forEach((el, i) => {
    el.classList.remove("active");
    if (i === step - 1) el.classList.add("active");
  });
  currentStep = step;
  updatePreview();
}

function toggleSelection(el, name) {
  const parent = el;
  const limit = parent.parentElement.id === "step1" ? 2 : 3;

  if (parent.classList.contains("selected")) {
    const index = selections[`step${currentStep}`].indexOf(name);
    if (index > -1) {
      selections[`step${currentStep}`].splice(index, 1);
      parent.classList.remove("selected");
    }
  } else {
    if (selections[`step${currentStep}`].length < limit) {
      selections[`step${currentStep}`].push(name);
      parent.classList.add("selected");
    }
  }

  updatePreview();
}

function nextStep() {
  const next = currentStep + 1;
  if (next <= 5) {
    showStep(next);
  }
}

function prevStep() {
  const prev = currentStep - 1;
  if (prev >= 1) {
    showStep(prev);
  }
}

function updatePrice() {
  let price = selections.step1.length > 0 ? 79 : 0;
  price += selections.step2.length * 10;
  price += selections.step3.length * 5;
  if (document.getElementById("container").value === "Eco Box (+₹10)") price += 10;
  document.getElementById("totalPrice").innerText = price;
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Please fill all fields");
    return;
  }

  updatePrice();
  document.getElementById("successModal").style.display = "block";
  showToast("Order placed successfully!");
}

function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

function updatePreview() {
  const bowl = document.getElementById("previewBowl");
  bowl.innerHTML = "";

  const items = [...selections.step1, ...selections.step2, ...selections.step3];
  const positions = [
    { top: "50%", left: "50%" },
    { top: "30%", left: "60%" },
    { top: "70%", left: "40%" },
    { top: "40%", left: "30%" },
    { top: "60%", left: "70%" }
  ];

  items.forEach((item, idx) => {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/id/ ${idx}/100/100`;
    img.alt = item;
    img.style.top = positions[idx]?.top || "50%";
    img.style.left = positions[idx]?.left || "50%";
    img.style.position = "absolute";
    bowl.appendChild(img);
  });

  updatePrice();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function startCountdown() {
  const now = new Date();
  const target = new Date();
  target.setHours(15, 0, 0, 0);

  const countdown = document.getElementById("countdown");
  const interval = setInterval(() => {
    const now = new Date();
    const diff = target - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (diff <= 0) {
      clearInterval(interval);
      countdown.innerText = "Order by time has passed!";
      countdown.style.color = "red";
    } else {
      countdown.innerText = `Time left: ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

window.onload = () => {
  showStep(1);
  startCountdown();
};