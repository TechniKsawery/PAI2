import express, { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

let todos = [
  {
    id:1,
    todo: "Do Homework"
  },
  {
    id:2,
    todo: "Clean Room"
  }
]

export const todosController = express.Router();

todosController.get("/", (req: Request, res: Response) => {
	res.status(StatusCodes.OK).send(todos);
});

todosController.post("/", (req: Request, res: Response) => {
	const data = req.body;
	todos.push(data);
	res.status(StatusCodes.CREATED).send(todos);
});

todosController.delete("/:id", (req: Request, res: Response) => {
	try {
		if (!req.params.id) {
			res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "could not found params id" });
		}
		const id = Number.parseInt(req.params.id);
		const todo = todos.find((ele) => ele.id === id);
		if (!todo) {
			res.status(StatusCodes.NOT_FOUND).send();
		}
		todos = todos.filter((ele) => {
			ele.id !== id;
		});

		res.status(StatusCodes.OK).json({ message: "to do deleted" });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

// app.patch("/todos/:id",(req:Request,res:Response)=>{
//   try{

//       if(!req.params.id){
//         res.status(400).json({message:"could not found params id"})
//       }
//       const id = Number.parseInt(req.params.id)
//       const todo = todos.find((ele)=>ele.id === id)
//       if(!todo){
//         res.status(404).send()
//       }
//       todos = todos.map((todo) => {
//         if(todo.id == req.params.id)
//     })

//       res.status(200).json(todos)

//   }
//   catch(err){
//     res.status(500)
//   }
// })
