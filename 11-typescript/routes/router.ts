import { Router, Request, Response } from "express";
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroe', (req:Request, res:Response) => {
    let sql = "SELECT * FROM heroes";
    MySQL.ejecutarQuery(sql, (err: any, data: Object[]) => {
        if (err)
            return res.status(400).send({
                err
            });
        res.send({
            heroes: data
        });
    });
});

router.get('/heroe/:id', (req:Request, res:Response) => {
    let id = MySQL.instance.cnn.escape(req.params.id);
    let sql = `SELECT * FROM heroes WHERE id = ${id}`;
    MySQL.ejecutarQuery(sql, (err: any, data: Object[]) => {
        if (err)
            return res.status(400).send({
                err
            });
        res.send({
            heroe: data.shift()
        });
    });
});

export default router;