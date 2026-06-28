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

async function cp(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {}
}

function openWhatsApp(text) {
  window.location.href = "whatsapp://send?text=" + encodeURIComponent(text);
}

send.onclick = async () => {
  const text = `${names[stage]} ${jump}`;

  await cp(text);

  if (navigator.vibrate) navigator.vibrate(30);

  openWhatsApp(text);

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

    await cp("קרקע");
    openWhatsApp("קרקע");
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

draw();
