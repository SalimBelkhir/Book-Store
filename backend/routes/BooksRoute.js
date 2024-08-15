import express from 'express' ;
import Book from '../models/bookModel.js' ;

const router = express.Router();

router.post('/',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear )
        {
            return response.status(400).send({
                message: 'send all required fields : title,author , publishYear',
            });
        }
        const newBook = {
            title : request.body.title,
            author:request.body.author ,
            publishYear : request.body.publishYear,
        };
        const book = await Book.create(newBook) ;
        return response.status(201).send(book) ;
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const book = await Book.find() ;

      if (!book) {
        return res.status(404).send({ message: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params; // Extract id from the request parameters
      const book = await Book.findById(id); // Use findById correctly
      if (!book) {
        return res.status(404).send({ message: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

  router.put('/:id',async(request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({message : 'Send all required fields : title ,author ,publishYear'});
        }
        const { id } = request.params ;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message : 'Book not found '})
        }
        return response.status(200).send({message : 'Book updated successfully'});
    }
    catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
    }
  });
  router.delete('/:id',async(request,response)=>{
    try{
        const { id } = request.params ;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message : 'Book not found'});
        }
        return response.status(200).send({message : 'Book is deleted'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
  })

  export default router;
