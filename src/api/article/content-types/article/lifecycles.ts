const transformEmbeds = (html: string): string => {
  return (
    html
      // Handle standard YouTube links with query params
      .replace(
        /<oembed url="https:\/\/www\.youtube\.com\/watch\?([^"]+)"><\/oembed>/g,
        (_: string, queryString: string) => {
          const params = new URLSearchParams(queryString);
          const videoId = params.get("v");
          return videoId ? buildIframe(videoId) : _;
        }
      )
      // Handle short youtu.be links
      .replace(
        /<oembed url="https:\/\/youtu\.be\/([^"?]+)(?:\?[^"]*)?"><\/oembed>/g,
        (_: string, videoId: string) => buildIframe(videoId)
      )
  );
};

const buildIframe = (videoId: string): string => {
  return `
    <div data-oembed-url="https://www.youtube.com/watch?v=${videoId}">
      <div style="position: relative; padding-bottom: 56.25%; height: 0;">
        <iframe src="https://www.youtube.com/embed/${videoId}"
                style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
};

export default {
  async beforeCreate(event) {
    if (event.params.data?.Body) {
      event.params.data.Body = transformEmbeds(event.params.data.Body);
    }
  },

  async beforeUpdate(event) {
    if (event.params.data?.Body) {
      event.params.data.Body = transformEmbeds(event.params.data.Body);
    }
  },
};
