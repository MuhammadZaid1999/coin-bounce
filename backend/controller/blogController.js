const Joi = require("joi");
const fs = require('fs');
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const {BACKEND_SERVER_PATH} = require('../config');
const BlogDTO = require('../dto/blog');
const BlogDetailsDTO = require('../dto/blog-details');


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {
    async create(req, res, next){
        // 1. validate request body
        // 2. handle photo storage, naming
        // 3. add to db
        // 4. return response

        // cleint side -> base64 encoded string -> decode -> store -> save photoPath in db
        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required()
        });

        const {error} = createBlogSchema.validate(req.body);
        if(error){
            return next(error);
        }

        const {title, author, content, photo} = req.body;

        // read as a buffer
        const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64')
        // allot a random name
        const imagePath = `${Date.now()}-${author}.png`;
        // save locally
        try {
            fs.writeFileSync(`storage/${imagePath}`, buffer)
        } catch (error) {
            return next(error);
        }

        // save blog in db
        let newBlog;
        try {
            newBlog = new Blog({
                title,
                author,
                content,
                photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`
            })
            await newBlog.save();
        } catch (error) {
            return next(error)            
        }
        const blogDto = new BlogDTO(newBlog);
        return res.status(201).json({blog: blogDto})
    }, 
    async getAll(req, res, next){
        try {
            const blogs = await Blog.find({});
            const blogDtos = [];
            for(let i=0; i<blogs.length; i++){
                const dto = new BlogDTO(blogs[i])
                blogDtos.push(dto);
            }

            return res.status(200).json({blogs: blogDtos})
        } catch (error) {
            return next(error)
        }
    },
    async getById(req, res, next){
        // valid id
        // response

        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })
        const {error} = getByIdSchema.validate(req.params);
        if(error){
            return next(error);
        }

        let blog;
        const {id} = req.params;
        try {
            blog = await Blog.findOne({_id: id}).populate('author');
        } catch (error) {
            return next(error);   
        }
        const blogDetailsDto = new BlogDetailsDTO(blog);
        return res.status(200).json({blog: blogDetailsDto});
    },
    async update(req, res, next){
        // validate
        
        const updateBlogSchema = Joi.object({
            title: Joi.string(),
            content: Joi.string(),
            author: Joi.string().regex(mongodbIdPattern).required(),
            blogId: Joi.string().regex(mongodbIdPattern).required(),
            photo: Joi.string(),
        }) 
        const {error} = updateBlogSchema.validate(req.body);
        if(error){
            return next(error);
        }
        
        const {title, content, author, blogId, photo} = req.body;
        if(!title && !content && !photo){
            const error = {
                status: 401,
                message: "Update atleast one field!",
            };
            return next(error);
        }
        
        // delete previous photo
        // save new photo
        let blog;
        try {
            blog = await Blog.findOne({_id: blogId});

            if(photo){
                let previousPhoto = blog.photoPath;
                previousPhoto = previousPhoto.split('/').at(-1);
                fs.unlinkSync(`storage/${previousPhoto}`);
            
                // read as a buffer
                const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64')
                // allot a random name
                const imagePath = `${Date.now()}-${author}.png`;
                // save locally
                try {
                    fs.writeFileSync(`storage/${imagePath}`, buffer)
                } catch (error) {
                    return next(error);
                }

                await Blog.updateOne({_id: blogId}, 
                    {title, content, photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`});
            }
            else{
                await Blog.updateOne({_id: blogId}, 
                    {title, content});
            }

            res.status(200).json({message: "blog updated!"})
        } catch (error) {
            return next(error)
        }
    },
    async delete(req, res, next){
        // validate id
        // delete blog
        // delete comments from blog

        const deleteBlogScehema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
        }) 
        const {error} = deleteBlogScehema.validate(req.params);
        if(error){
            return next(error);
        }

        const {id} = req.params;

        try {
            await Blog.deleteOne({_id: id});
            await Comment.deleteMany({blog: id});
        } catch (error) {
            return next(error);   
        }

        res.status(200).json({message: 'Blog Deleted!'})
    },
}

module.exports = blogController;