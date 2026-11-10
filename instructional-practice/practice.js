(() => {
  "use strict";
  const practice = document.getElementById("instructional-practice");
  if (!practice) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollBehavior = () => reduceMotion.matches ? "instant" : "smooth";

  for (const rail of practice.querySelectorAll(".practice-rail")) {
    const group = rail.closest(".practice-group");
    const cards = Array.from(rail.querySelectorAll(".practice-card"));
    const controls = group.querySelector(".practice-controls");
    const previous = controls.querySelector("[data-direction='-1']");
    const next = controls.querySelector("[data-direction='1']");
    const range = controls.querySelector(".practice-range");
    const visible = () => {
      const bounds = rail.getBoundingClientRect();
      return cards.map((card, i) => {
        const r = card.getBoundingClientRect();
        const intersection = Math.min(r.right, bounds.right) - Math.max(r.left, bounds.left);
        return intersection > r.width * 0.5 ? i : -1;
      }).filter(i => i >= 0);
    };
    function update() {
      const overflow = rail.scrollWidth - rail.clientWidth > 3;
      const onScreen = visible();
      controls.hidden = false;
      previous.hidden = next.hidden = !overflow;
      previous.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
      if (!onScreen.length) return;
      const text = overflow
        ? (onScreen[0] + 1) + "–" + (onScreen[onScreen.length-1] + 1) + " of " + cards.length
        : cards.length + " " + ({methods:"methods", strategies:"strategies", expertise:"areas"}[group.dataset.kind] || "items");
      if (range.textContent !== text) range.textContent = text;
    }
    function toPage(direction) {
      const onScreen = visible();
      if (!onScreen.length) return;
      const index = Math.max(0, Math.min(cards.length - 1, onScreen[0] + direction * onScreen.length));
      const left = rail.scrollLeft + cards[index].getBoundingClientRect().left - rail.getBoundingClientRect().left;
      rail.scrollTo({left, behavior: scrollBehavior()});
    }
    previous.addEventListener("click", () => toPage(-1));
    next.addEventListener("click", () => toPage(1));
    let frame = 0;
    rail.addEventListener("scroll", () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {frame = 0; update();});
    }, {passive: true});
    if ("ResizeObserver" in window) {
      new ResizeObserver(update).observe(rail);
    } else {
      window.addEventListener("resize", update);
    }
    rail.addEventListener("keydown", event => {
      const index = cards.indexOf(event.target.closest(".practice-card"));
      if (index < 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const destination = {ArrowLeft: index-1, ArrowRight: index+1, Home: 0, End: cards.length-1}[event.key];
      if (destination === undefined) return;
      event.preventDefault();
      const card = cards[Math.max(0, Math.min(cards.length-1, destination))];
      card.focus({preventScroll: true});
      const r = card.getBoundingClientRect(), box = rail.getBoundingClientRect();
      const delta = r.left < box.left ? r.left-box.left : r.right > box.right ? r.right-box.right : 0;
      if (Math.abs(delta) > 1) rail.scrollTo({left: rail.scrollLeft+delta, behavior: scrollBehavior()});
    });
    update();
  }

  /* Cards remain ordinary links to their complete entries without JavaScript.
     The guide HTML is also the single source of text displayed in the dialog. */
  const dialog = practice.querySelector("dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const pane = dialog.querySelector(".practice-dialog-body");
  const close = dialog.querySelector(".practice-close");
  const cards = Array.from(practice.querySelectorAll(".practice-card[data-entry]"));
  if (!cards.length) return;
  const guideURL = new URL(cards[0].href);
  guideURL.hash = "";
  let guidePromise = null;
  let opener = null;
  let request = 0;
  function getGuide() {
    if (!guidePromise) {
      guidePromise = fetch(guideURL.href, {credentials: "same-origin"})
        .then(response => {
          if (!response.ok) throw Error("Guide unavailable");
          return response.text();
        })
        .then(html => new DOMParser().parseFromString(html, "text/html"))
        .catch(error => {guidePromise=null; throw error;});
    }
    return guidePromise;
  }
  const warm = () => {getGuide().catch(() => {});};
  for (const card of cards) {
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-controls", dialog.id);
    card.addEventListener("pointerenter", warm, {once: true});
    card.addEventListener("focus", warm, {once: true});
    card.addEventListener("click", async event => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const token = ++request;
      opener = card;
      const pending = document.createElement("p");
      pending.className = "practice-loading";
      pending.textContent = "Opening " + card.textContent.trim().replace(/\s+/g, " ") + "…";
      pending.setAttribute("role", "status");
      pane.replaceChildren(pending);
      pane.setAttribute("aria-busy","true");
      dialog.removeAttribute("aria-labelledby");
      dialog.setAttribute("aria-label","Instructional design explanation");
      if (!dialog.open) dialog.showModal();
      document.documentElement.classList.add("practice-dialog-open");
      dialog.scrollTop=0;
      try {
        const source = (await getGuide()).getElementById(card.dataset.entry);
        if (token !== request || !dialog.open) return;
        if (!source || !source.classList.contains("practice-entry")) throw Error("Missing guide entry");
        const entry = document.importNode(source, true);
        entry.removeAttribute("id");
        const title = entry.querySelector(".practice-entry-title");
        title.id = "practice-dialog-title";
        title.tabIndex = -1;
        pane.replaceChildren(entry);
        pane.removeAttribute("aria-busy");
        dialog.setAttribute("aria-labelledby", title.id);
        dialog.removeAttribute("aria-label");
        dialog.scrollTop=0;
        title.focus({preventScroll:true});
      } catch (error) {
        if (token === request && dialog.open) {
          dialog.close();
          window.location.assign(card.href);
        }
      }
    });
  }
  close.addEventListener("click", () => dialog.close());
  const outside = event => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };
  let backdropPress = false;
  dialog.addEventListener("pointerdown", e => {backdropPress=e.target===dialog && outside(e);});
  dialog.addEventListener("click", e => {
    if (backdropPress && e.target===dialog && outside(e)) dialog.close();
    backdropPress = false;
  });
  dialog.addEventListener("close", () => {
    ++request;
    document.documentElement.classList.remove("practice-dialog-open");
    if (opener && opener.isConnected) opener.focus({preventScroll: true});
    opener = null;
    pane.replaceChildren();
  });
})();
