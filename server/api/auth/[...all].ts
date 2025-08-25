import { serverAuth } from "~~/server/utils/serverAuth"; // import your auth config
 
export default defineEventHandler((event) => {
	return serverAuth().handler(toWebRequest(event));
});