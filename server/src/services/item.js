import axios from 'axios';

export default class ItemService {

  constructor(){}

  buildItemsResponse(data) {
    let categories = null;
    let itemList = data.results.map((element) => {
      let price = element.price.toString().split('.');
      let item = {
        id: element.id,
        title: element.title,
        price: {
          currency: element.currency_id,
          amount: parseInt(price[0]),
          decimals: price.length > 1 ? parseInt(price[1]) : null,
        },
        picture: element.thumbnail,
        condition: element.condition,
        free_shipping: element.shipping.free_shipping,
      };
      return item;
    });

    if (data.filters) {
      let categoryFilter = data.filters.filter((element, index) => {
        return element.id === "category" && element.type === "text";
      });
      let itemsCategories = categoryFilter.length && categoryFilter[0].values && categoryFilter[0].values[0];
      categories = itemsCategories ? itemsCategories.path_from_root : null;

    }
    return {categories: categories, items: itemList}
  }

  buildSingleItemResponse(itemData, descriptionData){
    let price = itemData.price.toString().split('.');
    let item = {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: parseInt(price[0]),
          decimals: price.length > 1 ? parseInt(price[1]) : null,
        },
        picture: itemData.pictures.length ? itemData.pictures[0] : null,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        description: descriptionData ? descriptionData.plain_text : null
      };
    return item
  }

  async searchItems(query, limit=4) {
    const baseUrl = "".concat(
      process.env.SERVICE_BASE_URL,"/sites/MLA/search");
    const url = `${baseUrl}?q=${query}&limit=${limit}`;
    let response = null;
    try {
      response = await axios.get(url);
    } catch(error) {
      throw error;
    }
    return this.buildItemsResponse(response.data);
  }
   
  async getItem(id){
    const url = "".concat(process.env.SERVICE_BASE_URL,"/items/", id);
    let response = null;
    try {
      response = await axios.all(
        [
          axios.get(url),
          axios.get(url+'/description')
          .catch(error => null)
        ]);
    } catch(error) {
      throw error;
    }

    return this.buildSingleItemResponse(
      response[0].data, response[1] ? response[1].data : null);
  }
}