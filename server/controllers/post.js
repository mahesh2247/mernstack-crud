const Post = require('../models/post');
const slugify = require('slugify')

exports.create = (req,res)=>{
    // res.json({
    //     data:'hello from controllers'
    // });
//  console.log(req.body);

const {title,content,user}=req.body
const slug = slugify(title)

//validate
switch(true)
{
    case !title:
        return res.status(400).json({error:'Title is required'})
        break;

    case !content:
        return res.status(400).json({error:'Content is required'})
        break;


}


//create a post
Post.create({title,content,user,slug},(err,post)=>{
    if(err) {
        console.log(err)
        res.status(400).json({error:'Duplicate post, try another title'})
    }

    res.json(post);
})


};
//listing all posts from mongoose (MongoAtlas)
exports.list = (req,res) => {
    Post.find({})
    .limit(10)  //limits number of posts to 10
    .sort({createdAt:-1})  //sorts posts in descending latest first
    .exec((err,posts) => {
        if(err) console.log(err);
        res.json(posts);



    });

};
//for reading from db using slug
exports.read = (req,res) => {
    const {slug} = req.params
    Post.findOne({slug})
    
        .exec((err,post) => {
            if(err) console.log(err);
            res.json(post);



    });

};

//for find and update using slug
exports.update = (req,res) => {
    const {slug} = req.params;
    const {title, content, user} = req.body
    Post.findOneAndUpdate({slug}, {title, content, user},{new:true}).exec((err,post) => {
        if (err) console.log(err)
            res.json(post);
    }) ;  //return updated post hence new:true

};

//delete using slug
exports.remove = (req,res) => {
    const {slug} = req.params
    Post.findOneAndRemove({slug})
    
        .exec((err,post) => {
            if(err) console.log(err);
            res.json({
                message:'Post deleted!'
            });



    });

};