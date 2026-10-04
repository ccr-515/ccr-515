// Verify server configuration before presenting generation as available.
// This check does not spend AI credits or claim provider authentication is tested.
(() => {
  let enabled = false;
  const generate = document.getElementById('generate');
  const remix = document.getElementById('remix-submit');
  const label = document.getElementById('generate-label');
  const status = document.getElementById('generation-status');
  const remixStatus = document.getElementById('remix-status');
  const beta = document.querySelector('.beta');
  generate.disabled = true;
  remix.disabled = true;
  label.textContent = 'Checking connection…';
  function showUnavailable(message) {
    generate.disabled = true;
    remix.disabled = true;
    label.textContent = 'AI setup required';
    generate.setAttribute('aria-describedby', 'generation-status');
    status.hidden = false;
    status.classList.add('error');
    status.textContent = message;
    remixStatus.textContent = 'AI remixing awaits the server connection. Previews, saving, and HTML export are available.';
    if (beta) beta.textContent = 'STUDIO PREVIEW';
  }
  document.addEventListener('keydown', event => {
    if (!enabled && (event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  document.getElementById('remix-form').addEventListener('submit', event => {
    if (!enabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  fetch('/api/generate', { cache: 'no-store', signal: AbortSignal.timeout(8000) })
    .then(async response => {
      if (!response.ok) throw new Error('Connection check failed');
      return response.json();
    })
    .then(health => {
      if (!health.configured) {
        showUnavailable('Studio preview: AI generation is not connected yet. Backend storage and server settings need owner authorization. Explore, save, and export the six studio examples below.');
        return;
      }
      enabled = true;
      generate.disabled = false;
      remix.disabled = false;
      label.textContent = 'Create website';
    })
    .catch(() => showUnavailable('The generation service could not be reached. Reload to check again. Studio examples, previews, saving, and HTML export remain available.'));
})();
