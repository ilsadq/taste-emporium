import * as prismic from '@prismicio/client'
import {env} from '$env/dynamic/public'

const routes = [
    {
        type: 'recipepost',
        path: '/',
    },
];

const createClient = ({ request, fetch } = {}) => {
    const clientOptions = {
        fetch,
        accessToken: env.PUBLIC_TOKEN,
        routes,
        headers: {'Access-Control-Allow-Origin': '*'}
    }
    const client = prismic.createClient(env.PUBLIC_REPOSITORY, clientOptions)

    if (request) client.enableAutoPreviewsFromReq(request);

    return client;
}

export default createClient;