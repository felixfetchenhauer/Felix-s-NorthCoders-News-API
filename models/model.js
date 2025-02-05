const db = require("../db/connection");

exports.selectTopics = () => {
    return db
    .query("SELECT * FROM topics").then((result) => {
        return result.rows
    })
}

exports.selectArticleById = (article_id) => {
    return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
        if (result.rows.length === 0){
            return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return result.rows[0]
    })
}

exports.selectArticles = () => {
    return db
    .query(`
        SELECT 
            articles.article_id,
            articles.title,
            articles.topic,
            articles.author,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
            COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC;
    `)
    .then(({ rows }) => {
        return rows;
    });
};

exports.checkIfArticleExists = (article_id) => {
    return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
}

exports.selectCommentsFromArticle = (article_id) => {
    return db.query(
        `SELECT 
            comment_id, 
            votes, 
            created_at, 
            author, 
            body, 
            article_id 
         FROM comments 
         WHERE article_id = $1 
         ORDER BY created_at DESC`, 
        [article_id]
    )  
    .then((result) => {
        return result.rows;
    });
};
