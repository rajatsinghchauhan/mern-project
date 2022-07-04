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
    console.log(querystrCopy);
    removefield.forEach((key) => delete querystrCopy[key]);
    console.log(querystrCopy);
    this.query = this.query.find(querystrCopy);
    return this ;
  };
}

module.exports = Apifeatures;
