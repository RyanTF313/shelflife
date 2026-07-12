(function () {
  var currentScript = document.currentScript;
  if (!currentScript) return;

  var productId = currentScript.getAttribute('data-product-id');
  var apiUrl = (
    currentScript.getAttribute('data-api-url') || 'http://localhost:3000'
  ).replace(/\/$/, '');

  if (!productId) {
    console.error('[Shelflife Widget] Missing required data-product-id attribute.');
    return;
  }

  var host = document.createElement('div');
  currentScript.insertAdjacentElement('afterend', host);
  var shadow = host.attachShadow({ mode: 'open' });

  var style = document.createElement('style');
  style.textContent = [
    ':host { all: initial; }',
    '.sf-widget { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }',
    '.sf-message { color: #6b7280; font-size: 14px; padding: 8px 0; }',
    '.sf-track { display: flex; gap: 12px; overflow-x: auto; padding: 4px 2px 12px; scrollbar-width: thin; }',
    '.sf-card { flex: 0 0 auto; width: 160px; }',
    '.sf-media { position: relative; width: 160px; height: 220px; border-radius: 10px; overflow: hidden; background: #111827; cursor: pointer; }',
    '.sf-media img, .sf-media video { width: 100%; height: 100%; object-fit: cover; display: block; }',
    '.sf-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.25); border: none; color: #fff; font-size: 28px; cursor: pointer; }',
    '.sf-title { margin: 6px 0 0; font-size: 13px; color: #111827; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }',
  ].join('\n');
  shadow.appendChild(style);

  var root = document.createElement('div');
  root.className = 'sf-widget';
  root.innerHTML = '<p class="sf-message">Loading videos…</p>';
  shadow.appendChild(root);

  function trackEvent(kind, videoId) {
    fetch(apiUrl + '/widget/videos/' + encodeURIComponent(videoId) + '/' + kind, {
      method: 'POST',
    }).catch(function () {});
  }

  function playVideo(media, video) {
    media.innerHTML = '';
    var el = document.createElement('video');
    el.src = video.videoUrl;
    el.controls = true;
    el.autoplay = true;
    el.playsInline = true;
    media.appendChild(el);
    trackEvent('views', video.id);
  }

  function renderCard(video) {
    var card = document.createElement('div');
    card.className = 'sf-card';

    var media = document.createElement('div');
    media.className = 'sf-media';

    if (video.thumbnailUrl) {
      var thumb = document.createElement('img');
      thumb.src = video.thumbnailUrl;
      thumb.alt = video.title;
      media.appendChild(thumb);
    }

    var playBtn = document.createElement('button');
    playBtn.className = 'sf-play';
    playBtn.setAttribute('aria-label', 'Play ' + video.title);
    playBtn.textContent = '▶';
    media.appendChild(playBtn);

    media.addEventListener(
      'click',
      function () {
        trackEvent('clicks', video.id);
        playVideo(media, video);
      },
      { once: true },
    );

    var title = document.createElement('p');
    title.className = 'sf-title';
    title.textContent = video.title;

    card.appendChild(media);
    card.appendChild(title);
    return card;
  }

  function renderCarousel(data) {
    var videos = (data && data.videos) || [];
    if (videos.length === 0) {
      root.innerHTML = '<p class="sf-message">No videos yet.</p>';
      return;
    }
    root.innerHTML = '';
    var track = document.createElement('div');
    track.className = 'sf-track';
    videos.forEach(function (video) {
      track.appendChild(renderCard(video));
    });
    root.appendChild(track);
  }

  fetch(apiUrl + '/widget/products/' + encodeURIComponent(productId))
    .then(function (res) {
      if (!res.ok) throw new Error('Request failed with status ' + res.status);
      return res.json();
    })
    .then(renderCarousel)
    .catch(function () {
      root.innerHTML = '<p class="sf-message">Unable to load videos.</p>';
    });
})();
