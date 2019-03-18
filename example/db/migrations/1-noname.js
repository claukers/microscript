'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "blas", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-03-18T03:58:22.282Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "blas",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "text": {
                "type": Sequelize.STRING,
                "field": "text",
                "allowNull": false
            },
            "valid": {
                "type": Sequelize.BOOLEAN,
                "field": "valid",
                "defaultValue": false,
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
