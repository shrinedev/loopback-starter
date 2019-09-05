import { ServerApplication } from './application';

export async function main() {
  const app = new ServerApplication();
  await app.boot();
  await app.start();
  await app.startAddOns();
  return app;
}
