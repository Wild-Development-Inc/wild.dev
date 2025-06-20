/**
 * Cloudflare R2 doesn't automatically serve index.html at the root.
 * You need to use a Cloudflare Worker as a lightweight router. 
 */
export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		let key = url.pathname.slice(1);

		// Serve index.html for root path
		if (key === "") {
			key = "index.html";
		}

		try {
			const object = await env.MY_BUCKET.get(key);
			if (object === null) {
				return new Response("404 Not Found", { status: 404 });
			}

			return new Response(object.body, {
				headers: {
					"Content-Type": "text/html", // or auto-detect with extension
				},
			});
		} catch (e) {
			return new Response("Error loading file", { status: 500 });
		}
	},
};
