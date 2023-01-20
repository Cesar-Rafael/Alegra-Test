import moment from "moment";

export default class Invoice {
  constructor(
    quantity,
    idClient = 3,
    idProduct = 2,
    priceProduct = 100,
    idSeller = 1
  ) {
    const date = moment(new Date()).format("YYYY-MM-DD");

    this.client = {
      id: idClient,
    };
    this.stamp = {
      generateStamp: "false",
    };
    this.operationType = "INTERNAL_SALE";
    this.seller = idSeller;
    this.items = [
      {
        id: idProduct,
        price: priceProduct,
        quantity,
      },
    ];
    this.dueDate = date;
    this.date = date;
  }
}
