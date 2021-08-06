/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

const prisma = new PrismaClient();

// eslint-disable-next-line import/no-anonymous-default-export
const session = getSession();
const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },

  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const isLogin = function isLoggedIn(req, res) {
  console.log("inside");
  if (!session ) {
    res.status(401).json({ error: "You are not allowed!" });
  }
};
console.log("before");
apiRoute.use(isLogin);
apiRoute.post(async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  const { skills, ...data } = req.body;

  try {
    const result = await prisma.job.create({
      data: {
        ...data,
      },
    });
    const mapSkillsWithJobId = skills.map((skill) => {
      const mappedSkill = {};
      mappedSkill["skill"] = skill;
      mappedSkill["jobId"] = result.id;
      return mappedSkill;
    });
    const skillsResult = await prisma.jobSkill.createMany({
      data: mapSkillsWithJobId,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured ." });
  }
})
export default apiRoute ;
