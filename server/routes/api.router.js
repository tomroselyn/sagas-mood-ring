//setup
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//routes

//get /tags
router.get('/tags', (req, res) => {
    let sqlText = `SELECT * FROM "tags";`;
    pool.query(sqlText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error from api.router GET /tags:', err);
        res.sendStatus(500);
    })
}); //end get /tags

//get /images
router.get('/images', (req, res) => {
    let sqlText = `
        SELECT "images".id, "images".title, "images".path, 
        array_agg("images_tags".tags_id) as tags FROM "images"
        FULL JOIN "images_tags" ON "images_tags".images_id = "images".id
        GROUP BY "images".id ORDER BY "images".id;`;
    pool.query(sqlText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log('error from api.router GET /images:', err);
        res.sendStatus(500);
    })
}); //end get /images

//post /images/addtag using req.query values for image_id and tag_id
router.post('/images/addtag', (req, res) => {
    let sqlText = `INSERT INTO "images_tags" ("images_id", "tags_id")
                    VALUES ($1, $2);`;
    pool.query(sqlText, [req.query.image_id, req.query.tag_id])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(err => {
        console.log('error from api.router POST /images/addtag:', err);
        res.sendStatus(500);
    })
}) //end post /images/addtag