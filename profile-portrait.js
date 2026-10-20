(() => {
  const figure = document.querySelector('.profile-portrait');
  const portrait = figure?.querySelector('.profile-portrait-image');
  if (!portrait) return;

  // Keep the existing owner-only editor and persistent photo on Sites.
  // The portfolio pages, project art, font, and PDF are all hosted on GitHub.
  // For a fully GitHub-hosted portrait, add assets/profile-photo.jpg and change
  // PHOTO_SOURCE to 'github'. See README.md for instructions.
  const PHOTO_SOURCE = 'sites';
  const source = PHOTO_SOURCE === 'github'
    ? '/assets/profile-photo.jpg'
    : 'https://leyli-learning-design.opalsole4.chatgpt.site/api/profile-photo/image';

  portrait.addEventListener('load', () => { figure.hidden = false; });
  portrait.addEventListener('error', () => { figure.hidden = true; });
  function refreshPhoto() {
    portrait.src = `${source}?updated=${Date.now()}`;
  }
  refreshPhoto();
  // Returning from the editor refreshes a replaced or removed photo.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshPhoto();
  });
})();
