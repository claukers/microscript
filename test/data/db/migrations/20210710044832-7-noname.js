'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "blo22" to table "post2s"
 *
 **/

var info = {
    "revision": 7,
    "name": "noname",
    "created": "2021-07-10T08:48:32.213Z",
    "comment": ""
};

var migrationCommands = [ 
{ fn: "addColumn", params: [
    "post2s",
    "blo22",
    { "type": Sequelize.STRING, "field":"blo22", "allowNull":true }
] } 
];


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
