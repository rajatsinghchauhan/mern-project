class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search = () => {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  };

  filter = () => {
    const querystrCopy = { ...this.queryStr };
    const removefield = ["keyword", "page", "limit"];

    removefield.forEach((key) => delete querystrCopy[key]);
    console.log(querystrCopy);

    // filter for price and Rating
    let queryStr = JSON.stringify(querystrCopy);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr);
    return this;
  };

  pagination(resultperpage) {
    const currentpage = Number(this.queryStr.page) || 1;
    const skip = resultperpage * (currentpage - 1);
    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}

module.exports = Apifeatures;
