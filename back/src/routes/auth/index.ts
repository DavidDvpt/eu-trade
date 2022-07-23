import express from "express";

interface LoginRequest {
  email: string;
  password: string;
}

const router = express.Router();

router.get("/login", (req, res) => {
  const body: LoginRequest = req.body;

  if(body.email || body.password){
    return res.status(400).json({message: 'Error. Please enter the correct username and password'})
  }

    const router = express.Router();
    
    router.get("/", (req, res) => {
      res.status(200).json("Hello Word !!!");
    });
    
    
    
    export default router;
    '})
  }

  res.status(200).json("Hello Word !!!");
});

export default router;
