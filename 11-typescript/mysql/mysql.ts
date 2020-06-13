import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('clase inicializada');
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'cursonode'
        });
        this.connectDB();
    }


    public static get instance() : MySQL {
        if (!this._instance)
            this._instance = new this();

        return this._instance;
    }

    private connectDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) throw new Error(err.message);
            this.conectado = true;
        });
    }

    public static ejecutarQuery(sql: string, callback: Function) {
        this.instance.cnn.query(sql, callback);
    }
}
