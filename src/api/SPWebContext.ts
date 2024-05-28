import { spfi, SPBrowser } from "@pnp/sp";
import "@pnp/sp/content-types/list";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/items/list";
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";
import "@pnp/sp/batching";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/files/folder";
import "@pnp/sp/files/web";
import "@pnp/sp/comments/item";

declare const _spPageContextInfo: { webAbsoluteUrl: string };

export const webUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : _spPageContextInfo.webAbsoluteUrl;

export const spWebContext = spfi().using(SPBrowser({ baseUrl: webUrl }));
