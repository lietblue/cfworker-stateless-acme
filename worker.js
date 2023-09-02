export default {
  async fetch(request) {
    const acmeAccount = new Map();
    // change your domain and account thumbprint here.
    acmeAccount.set("your.domain.here","Your acme account thumbprint here");
    // This is the default respond thumbprint comment this line to disable it
    acmeAccount.set("default","Your default acme account thumbprint here");

    const url = new URL(request.url);
    const acmeChallengePathRegExp = new RegExp("^/.well-known/acme-challenge/([-_a-zA-Z0-9]+)$");
    const tokenMatch = acmeChallengePathRegExp.exec(url.pathname);
    
    if (tokenMatch !== null) {
      // https://datatracker.ietf.org/doc/html/rfc8555#page-64
      // [token].[acmeAccountThumbprint]
      if (acmeAccount.has(url.hostname)) {
        return new Response(tokenMatch[1] + "." + acmeAccount.get(url.hostname), { status: 200 });
      }
      if (acmeAccount.has("default")) {
        return new Response(tokenMatch[1] + "." + acmeAccount.get("default"), { status: 200 });
      }
    }

    // if you need to change your default respond, modify here.
    return new Response("I'm a teapot", { status: 418 });
    // you can also redirect to some other site.
    // return Response.redirect("https://google.com", statusCode);
    // for more usage refer to cloudflare worker doc
  },
};
