/**
* @param {string} url

* @param {RequestInit} options
* @returns Promise<Response>
*/

async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
        result = await fetch(url, options);
        json = await result.json();
    } catch (error) {
        throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
        throw new Error(json.message);
    }
    return json.data;
}

function makeReviewsService() {

    const baseUrl = '/api/v1/reviews';

    async function addReview(review) {
        return efetch(`${baseUrl}`, {
            method: 'POST',
            body: review,
        });
    }

    async function getReviews(recipe_id) {
        return efetch(`${baseUrl}/${recipe_id}`, {
            method: 'GET',
        });
    }

    async function getAvgRate(recipe_id) {
        return efetch(`${baseUrl}/avg/?recipe_id=${recipe_id}`, {
            method: 'GET',
        });
    }

    async function deleteReview(review_id) {
        return efetch(`${baseUrl}/${review_id}`, {
            method: 'DELETE',
        });
    }

    async function updateReview(review_id, review) {
        return efetch(`${baseUrl}/${review_id}`, {
            method: 'PUT',
            body: review,
        });
    }

    return {
        addReview,
        getReviews,      
        getAvgRate,
        deleteReview,
        updateReview,  
    };
}
export default makeReviewsService();
