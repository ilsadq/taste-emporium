import createClient from './PrismicIo.js'
import {POST_LIMIT, POST_CONTENT_TYPE, RECIPE_POST_TYPE} from "../SITE.js";
import {predicate} from "@prismicio/client";

class PrismicIoAdapter {
    constructor() {
        this._client = createClient();
    }

    async getPosts(page = 0, searchValue = '') {
        console.log('Get posts by page: ', page, 'search value', searchValue);
        const response = await this._client.get({
            predicates: [
                predicate.at('document.type', RECIPE_POST_TYPE),
                predicate.fulltext(`my.${RECIPE_POST_TYPE}.post_title`, searchValue)
            ],
            orderings: {
                field: 'document.first_publication_date',
                direction: 'desc'
            },
            pageSize: POST_LIMIT,
            page
        })

        return {
            data: response.results.map(x => ({
                title: x.data.post_title[0].text,
                imageUrl: x.data.post_image.url,
                cookingTime: x.data.cooking_time,
                uid: x.data.postcontent.uid
            })),
            page: response.page,
            totalResults: response.total_results_size,
            totalPages: response.total_pages,
            isEnd: null == response.next_page,
            isStart: null == response.prev_page
        }
    }

    async getPostContent(uid) {
        console.log('Get post content by id:', uid);
        const response = await this._client.getByUID(POST_CONTENT_TYPE, uid);
        return {
            imageUrl: response.data.headline_image.url,
            title: response.data.title[0].text,
            cookingTime: response.data.cooking_time,
            description: response.data.description[0].text,
            calories: response.data.energy_value[0].calories,
            proteins: response.data.energy_value[0].proteins,
            fats: response.data.energy_value[0].fats,
            carbohydrates: response.data.energy_value[0].carbohydrates,
            ingredients: [...response.data.ingredients.map(x => ({
                title: x.name[0].text,
                value: x.value[0].text
            }))],
            instruction: [...response.data.inscruction.map(x => ({
                imageUrl: x.image.url,
                description: x.ins_description[0].text
            }))]
        }
    }
}

export default PrismicIoAdapter;