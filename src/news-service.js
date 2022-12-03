import axios from 'axios';

export default class newsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        // this.calcPage = dataResponse.data.totalHits;
    };

    async fetchArticles() {

            const dataResponse = await axios.get(`https://pixabay.com/api/?key=31251439-64cf22bfdeb9633faeca9a5f6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            console.log('dataResponse-', dataResponse)
            console.log('dataResponse.data-', dataResponse.data)
            console.log('dataResponse.data.hits-', dataResponse.data.hits)
            console.log('dataResponsedata.TotalHits', dataResponse.data.totalHits)

         this.page += 1;
        return dataResponse.data.hits;

      }

        calcEndOfPages() {
        if (this.calcPage < 40) {
           (Notify.failure("We're sorry, but you've reached the end of search results."))
        }

    }


    resetPage() {
        this.page = 1;
}

    get query() {
            return this.searchQuery
    }


    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}