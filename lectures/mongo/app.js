
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer_2017', { useMongoClient: true }); //local db
mongoose.Promise = require('q').Promise;

var blogPostSchema = mongoose.Schema({
    title: String,
    body: String,
    postDate: {type: Date, default: Date.now()},
    thumbsUp: {type: Number, default: 0}
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);


function deleteBlogPost(postId) {
    return blogModel
        .remove({_id: postId});
}

function updateBlogPost(postId, newPost){
    return blogModel
        .update({_id: postId}, {
        $set:newPost
        });

}


function findBlogPostByTitle(title) {
    return blogModel.find({title: title});
}


function findBlogPostById(postId) {
    return blogModel.findById(postId);
}

function findAllBlogPosts() {
    return blogModel.find();

}

function createBlogPost(blogPost) {
    return blogModel
        .create(blogPost);
}
// createBlogPost({title: 'Post 345', body: 'Body 345'})
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.error(err);
//     });
//
//
// findAllBlogPosts()
//     .then(function (posts) {
//         console.log(posts);
//     });


// findBlogPostById("595bed73f93bf0125473f235")
//     .then(function (blogPost) {
//         console.log(blogPost);
//     })


// findBlogPostByTitle('Post 345')
//     .then(function (doc) {
//         console.log(doc);
//     }, function (err) {
//         console.log(err);
//     });


// updateBlogPost("595bed73f93bf0125473f235", {
//     body: 'Post 345 Post 345 Post 345 Post 345'
// })
//     .then(function (status) {
//         return findBlogPostById("595bed73f93bf0125473f235")
//     }, function (err) {
//         console.log(err);
//     })
//     .then(function (post) {
//         console.log(post);
//     }, function (err) {
//         console.log(err);
//     });
//
// deleteBlogPost("595bed73f93bf0125473f235")
//     .then(function (status) {
//         console.log(status);
//         return findAllBlogPosts();
//     })
//     .then(function (posts) {
//         console.log(posts);
//     });
//
