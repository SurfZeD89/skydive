const names = ["מסיעים", "המראה", "הצנחה"];

let jump = +(localStorage.jump || 1);
let stage = +(localStorage.stage || 0);

function save() {
  localStorage.jump = jump;
  localStorage.stage = stage;
}

function draw() {
  current.textContent = `${names[stage]} ${jump}`;
  info.textContent = `מספר ${jump} | ${names[stage]}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    alert("לא הצלחתי להעתיק אוטומטית. תעתיק ידנית: " + text);
  }
}

function openWhatsApp() {
  window.location.href = "whatsapp://";
}

send.onclick = async () => {
  const text = `${names[stage]} ${jump}`;

  await copyText(text);

  if (navigator.vibrate) navigator.vibrate(30);

  openWhatsApp();

  if (stage < 2) {
    stage++;
  } else {
    stage = 0;
    jump++;
  }

  save();
  draw();
};

back.onclick = () => {
  if (stage > 0) {
    stage--;
  } else if (jump > 1) {
    jump--;
    stage = 2;
  }

  save();
  draw();
};

reset.onclick = async () => {
  if (confirm("לאפס ולהעתיק 'קרקע'?")) {
    jump = 1;
    stage = 0;

    save();
    draw();

    await copyText("קרקע");
    openWhatsApp();
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

draw();
