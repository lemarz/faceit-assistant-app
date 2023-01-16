class Api {

   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   _handleResponse(res) {
      if (res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
   }


   playerId(nickName) {
      return fetch(`${this._baseUrl}/players?nickname=${nickName}&game=csgo`,
         {headers: this._headers})
         .then(this._handleResponse)
         .then(({player_id}) => player_id)
   }

   playerMatches(playerId, offset, limit = 100) {
      return fetch(`${this._baseUrl}/players/${playerId}/history?game=csgo&offset=${offset}&limit=${limit}`,
         {headers: this._headers})
         .then(this._handleResponse)
         .then(res => res.items)

   }

   playerStatistic(playerId) {
      return fetch(`${this._baseUrl}/players/${playerId}/stats/csgo`,
         {headers: this._headers}).then(this._handleResponse);
   }

}

// * Экземпляр Api
const api = new Api({
   baseUrl: 'https://open.faceit.com/data/v4',
   headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
   }
})

export default api