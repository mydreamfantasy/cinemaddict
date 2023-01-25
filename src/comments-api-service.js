import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class CommentsApiService extends ApiService {
  get comments() {
    return this._load({url: 'comments/11'})
      .then(ApiService.parseResponse);
  }

  // async updateTask(comment) {
  //   const response = await this._load({
  //     url: `comment/${comment.id}`,
  //     method: Method.POST,
  //     body: JSON.stringify(comment),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });

  //   const parsedResponse = await ApiService.parseResponse(response);

  //   return parsedResponse;
  // }
}
