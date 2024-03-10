// Initialise Apps framework client. See also:
// https://developer.zendesk.com/apps/docs/developer-guide/getting_started
var client = ZAFClient.init();

const fallbackUrl =
  "https://trex-runner.com?ticket_id={ticket_id}&current_user_email={current_user_email}&requester_email={requester_email}&assignee_id={assignee_id}";

let state = {
  ticket: null,
  settings: null,
  liveUrl: null,
  currentUser: null,
  requester: null,
  assignee: null,
};

/**
 * ZENDESK API
 */
async function zd() {
  let ticket = await client.get("ticket");
  let metadata = await client.metadata();
  let currentUser = await client.get("currentUser");
  let requester = await client.get("ticket.requester");
  let assignee = await client.get("ticket.assignee.user");

  state.settings = metadata.settings || null;
  state.ticket = ticket.ticket || null;
  state.currentUser = currentUser.currentUser || null;
  state.requester = requester["ticket.requester"] || null;
  state.assignee = assignee["ticket.assignee.user"] || null;
}

/**
 * FUNCTIONS
 */
function generateUrl() {
  let url;
  let urlTemplate = state?.settings?.url;

  if (urlTemplate) {
    url = urlTemplate;
  } else {
    url = fallbackUrl;
  }

  // VARIABLES
  // Ticket
  let ticket_id = state.ticket?.id || null;
  // Current User
  let current_user_id = state.currentUser?.id || null;
  let current_user_email = state.currentUser?.email || null;
  // Requester
  let requester_id = state.requester?.id || null;
  let requester_email = state.requester?.email || null;
  // Assignee
  let assignee_id = state.assignee?.id || null;
  let assignee_email = state.assignee?.email || null;

  url = url.replace("{ticket_id}", ticket_id);
  url = url.replace("{current_user_id}", current_user_id);
  url = url.replace("{current_user_email}", current_user_email);
  url = url.replace("{requester_id}", requester_id);
  url = url.replace("{requester_email}", requester_email);
  url = url.replace("{assignee_id}", assignee_id);
  url = url.replace("{assignee_email}", assignee_email);

  state.liveUrl = url;
  return url;
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(function () {
      flashClipboardCopied();
    })
    .catch(function (err) {
      // error
    });
}

/**
 * UI MANIPULATION
 */
const clipboardCheckIcon = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="2.5" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
const pasteClipboardIcon = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="2.5" fill="none" xmlns="https://www.w3.org/2000/svg" color="#000000"><path d="M8.5 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H15.5" stroke-width="2.5" stroke-linecap="round"></path><path d="M8 6.4V4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9.00422 3.77604 9.05152 3.50398C9.19968 2.65171 9.77399 1 12 1C14.226 1 14.8003 2.65171 14.9485 3.50398C14.9958 3.77604 15.2239 4 15.5 4C15.7761 4 16 4.22386 16 4.5V6.4C16 6.73137 15.7314 7 15.4 7H8.6C8.26863 7 8 6.73137 8 6.4Z"  stroke-width="2.5" stroke-linecap="round"></path></svg>`;

function populateUI() {
  // Set URL in "browser" bar
  let urlEl = document.getElementById("url");
  urlEl.textContent = state.liveUrl;
  urlEl.title = state.liveUrl;

  // Set URL as "open in new tab" button destination
  let a = document.getElementById("open-new-tab");
  a.href = state.liveUrl;
}

function loadEmbeddedSite() {
  const iframe = document.createElement("iframe");
  iframe.src = state.liveUrl;
  iframe.frameborder = true;

  let rootDiv = document.getElementById("browser");
  rootDiv.appendChild(iframe);
}

function flashClipboardCopied() {
  // Update the button display
  let btn = document.getElementById("copy-url");
  btn.innerHTML = clipboardCheckIcon;

  let timeoutId = setTimeout(() => {
    btn.innerHTML = pasteClipboardIcon;
  }, 2000);

  app.willDestroy = function () {
    clearTimeout(timeoutId);
  };
  return function () {
    clearTimeout(timeoutId);
  };
}

/**
 * EVENT LISTENERS
 */

const copyUrlBtn = document.getElementById("copy-url");
copyUrlBtn.addEventListener("click", function () {
  copyTextToClipboard(state.liveUrl);
});

/**
 * MAIN
 */

async function main() {
  await zd();
  generateUrl();

  if (state.settings.height) {
    client.invoke("resize", {
      width: "100%",
      height: `${state.settings.height}px`,
    });
  }

  populateUI();
  loadEmbeddedSite();
}

main();
