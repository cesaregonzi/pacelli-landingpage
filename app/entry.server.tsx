import type {EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream, renderToString} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

import {createInstance} from 'i18next';
import {I18nextProvider, initReactI18next} from 'react-i18next';
import Backend from 'i18next-fs-backend';
import {resolve} from 'path';
import i18nextOptions from '../i18nextOptions';
import i18n from '../i18n.server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  // i18next
  const instance = createInstance();
  const lng = await i18n.getLocale(request);
  const ns = i18n.getRouteNamespaces(remixContext);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend.init({
    .init({
      ...i18nextOptions, // use the same configuration as in your client side.
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render want to use
      backend: {
        loadPath: resolve('../public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  // App
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    frameSrc: ['https://www.google.com/'],
    defaultSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://flowbite.s3.amazonaws.com/',
      'https://e9-cms.sgp1.digitaloceanspaces.com',
    ],
  });
  const body = await renderToReadableStream(
    <NonceProvider>
      <I18nextProvider i18n={instance}>
        <RemixServer context={remixContext} url={request.url} />
      </I18nextProvider>
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
