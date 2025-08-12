const { json } = require("express");

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = {};

        Object.keys(this.queryStr).forEach(key => {
            if (["keyword", "page", "limit"].includes(key)) return;

            if (key.includes('[') && key.includes(']')) {
                const field = key.split('[')[0]; // Example: 'price'

                const operator = key.split('[')[1].replace(']', ''); // Example: 'gte'

                if (!queryCopy[field]) {
                    queryCopy[field] = {};
                }

                queryCopy[field][`$${operator}`] = Number(this.queryStr[key]);
            } else {
                queryCopy[key] = this.queryStr[key];
            }
        });

        this.query = this.query.find(queryCopy);

        console.log(queryCopy); // Optional: to see what you're querying

        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage -1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}


module.exports = ApiFeatures;