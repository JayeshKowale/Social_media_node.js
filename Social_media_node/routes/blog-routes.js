import express from "express";
import { deleteBlog, getALLBlogs, getById, updateBlog } from "../controller/blog-controller";
import { addBlog } from "../controller/blog-controller";
import { getByUserId } from "../controller/user-controller";

const blogrouter = express.Router();

blogrouter.get("/",getALLBlogs);
blogrouter.post("/add",addBlog);
blogrouter.put("/update/:id",updateBlog);
blogrouter.get("/:id",getById);
blogrouter.delete("/:id",deleteBlog);
blogrouter.get("/user/:id",getByUserId)
export default blogrouter;