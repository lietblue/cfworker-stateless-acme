export default {
  async fetch(request) {
    // change your account thumbprint here.
    const acmeAccountThumbprint = "Your acme account thumbprint here";

    const url = new URL(request.url);
    const acmeChallengePathRegExp = new RegExp("^/.well-known/acme-challenge/([-_a-zA-Z0-9]+)$");
    const tokenMatch = acmeChallengePathRegExp.exec(url.pathname);

    if (tokenMatch !== null ) {
      // https://datatracker.ietf.org/doc/html/rfc8555#page-64
      // [token].[acmeAccountThumbprint]
      return new Response(tokenMatch[1] + "." + acmeAccountThumbprint, { status: 200 });
    }

    // if you need to change your default respond, modify here.
    return new Response("I'm a teapot", { status: 418 });
    // you can also redirect to some other site.
    // return Response.redirect("https://google.com", statusCode);
    // for more usage plz refer to cloudflare worker doc
  },
};
