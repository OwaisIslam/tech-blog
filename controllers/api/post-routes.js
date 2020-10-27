const router = require('express').Router();
const {
    User,
    Post,
    Comment
} = require('../../models');


// Get all posts
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["id", "content", "title", "created_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update a post
router.put("/:id", (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a post
router.delete("/:id", (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;