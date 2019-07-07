const express = require("express"),
    path = require("path"),
    router = express.Router();
const Post = require("../database/models/Post");
// import middleware
const auth = require("../middleware/auth");

/**
 * Render a form to create a new post
 */
router.get('/new', auth.isLoggedIn, async (req, res) => {

    console.log(req.session);

    res.render("create", {});

});

/**
 * Save a new post
 */
router.post('/store', auth.isLoggedIn, (req, res) => {
    const { image } = req.files;

    image.mv(path.resolve(__dirname, "..", "public/posts", image.name), error => {
        Post.create(
            {
                ...req.body,

                image: `/posts/${image.name}`
            },
            (error, post) => {
                res.redirect("/");
            }
        );
    });

});


/**
 * Get a post by ID
 */
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    res.render("post", {
        post
    });
});

module.exports = router;