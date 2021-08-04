import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    const {skills,...data} = req.body;
    
    try {
      const result = await prisma.job.create({
        data:{
            ...data,
        }
      });
      const mapSkillsWithJobId = skills.map(skill => {
        const mappedSkill = {}
        mappedSkill['skill'] = skill;
        mappedSkill['jobId'] = result.id
        return mappedSkill
      })
      const skillsResult = await prisma.jobSkill.createMany({
        data: mapSkillsWithJobId
      })
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err: "Error occured while adding a new food." });
    }
  };