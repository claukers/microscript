'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-03-23T02:12:02.846Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "posts",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "url": {
                "type": Sequelize.STRING,
                "field": "url",
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name",
                "allowNull": false
            },
            "valid": {
                "type": Sequelize.BOOLEAN,
                "field": "valid",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
