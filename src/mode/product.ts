export class Product {
  public id: number;
  public name: string;
  public describe: string;
  public createTime: string;

  constructor(
    id: number,
    name: string,
    describe: string,
    createTime: string
  ) {
    this.id = id;
    this.name = name;
    this.describe = describe;
    this.createTime = createTime;
  }

}