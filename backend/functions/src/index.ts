import { https as httpsV2 } from 'firebase-functions/v2';

export const helloFireWorld=httpsV2.onRequest((request, response    ) => {
    response.json({data: 'Hello from Firebase!'});
});