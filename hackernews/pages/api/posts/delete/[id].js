import { prisma } from "@prisma/client";
import { toast } from "react-toastify";

export default async function handler(req, res) {
    console.log(id);
    const { id } = req.query;
    const data = await prisma.article.delete({
        where:{
            id
        }
    });
    toast.success('post deleted successfully!!',{
        position:'top-center'
    })
    res.status(200).redirect('/');
  }
  